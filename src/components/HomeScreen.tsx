import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ListView } from 'react-nativescript'
import { ItemEventData } from '@nativescript/core'

import { MainStackParamList } from "../NavigationParamList";

import { DepotModel } from '../models/depot.model';
import { DepotService } from '../services/depot.services';
import { useEffect, useState } from "react";
import { TourneeModel } from '../models/tournee.model';
import { TourneeService } from '../services/tournee.services';
import { BarcodeScanner } from 'nativescript-barcodescanner';

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "HomeScreen">,
    navigation: FrameNavigationProp<MainStackParamList, "HomeScreen">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [depots, setDepots] = useState<DepotModel[]>([]);
    const [tournee, setTournee] = useState<TourneeModel[]>([]);
    const barcodeScanner = new BarcodeScanner();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const depotData: DepotModel[]= await DepotService.getDepot();
          setDepots(depotData);
        } catch (error) {
          console.error("Error Depots:", error);
        }

        try {
          const tourneeData: TourneeModel[] = await TourneeService.getTournee();
          tourneeData.sort((a, b) => (a.ordre || 0) - (b.ordre || 0));
          setTournee(tourneeData)
        }catch(error){
          console.error("Error Depots:", error)
        }
      };  

      fetchData();
    }, []);

    const onItemTap = (args: ItemEventData) => {
      const tourneeid = args.object.get("data-index");
      navigation.navigate('DetailsTourneeScreen', {
        tourneeId: tourneeid,
      })
    }

    const handleEndTourneeButton = async (args: ItemEventData) => {
      const tourneeid = args.object.get("data-index"); 
      console.log(tourneeid)
      try {
        const result = await barcodeScanner.scan({
          formats: "QR_CODE",
          message: "Veuillez scanner le QR code de fin de tournée",
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          torchOn: false,
          resultDisplayDuration: 500,
          openSettingsIfPermissionWasPreviouslyDenied: true
        });
        
        if (result.text === "DEPOT:3") {
          const updatedTournee = tournee.filter(t => t.tournee_id !== tourneeid);
          setTournee(updatedTournee);
          console.log("Fin de tournée détectée !");
        } else {
          console.log("QR code non valide");
        }
      } catch (error) {
        console.error("Erreur lors de la numérisation du QR code :", error);
      }
    };

    const depotFactory = (depot: DepotModel) => {
        return <label text={depot.adresse} />
    }

    const tourneeFactory = (tournee: TourneeModel) =>{
      return  (
        <stackLayout
          height="280"
          borderRadius="10"
          className="bg-secondary"
          margin="5 10"
          padding="10"
        >
          <label
            width="50"
            height="10"
            backgroundColor={tournee.couleur}
            borderRadius="6"
          />
          <label
            fontWeight="700"
            className="text-primary"
            fontSize="18"
            text={tournee.ordre.toString()}
          />
          <label
            margin="0"
            className="text-secondary"
            fontSize="14"
            textWrap="true"
            text={tournee.tournee}
          />
           <button
            margin="0"
            className="text-secondary"
            fontSize="12"
            data-index={tournee.tournee_id}
            text={"Fin de Tournée"}
            onTap={handleEndTourneeButton}
          />
          <button
            margin="0"
            className="text-secondary"
            fontSize="12"
            data-index={tournee.tournee_id}
            text={"Details Tournée"}
            onTap={onItemTap}
          />
        </stackLayout>
      );
    }

    return (
    <stackLayout height="100%">
        <ListView
          items={tournee}
          onItemTap={onItemTap}
          cellFactory={tourneeFactory}
          separatorColor="transparent"
          height="100%"
        />
      </stackLayout>
    );
}

