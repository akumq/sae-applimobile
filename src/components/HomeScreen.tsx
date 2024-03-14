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

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "HomeScreen">,
    navigation: FrameNavigationProp<MainStackParamList, "HomeScreen">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [depots, setDepots] = useState<DepotModel[]>([]);
    const [tournee, setTournee] = useState<TourneeModel[]>([]);

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
      const index = args.index
      const ntournee : TourneeModel = tournee[index]
      navigation.navigate('DetailsTourneeScreen', {
        tourneeId: ntournee.tournee_id,
      })
    }


    const depotFactory = (depot: DepotModel) => {
        return <label text={depot.adresse} />
    }

    const tourneeFactory = (tournee: TourneeModel) =>{
      return  (
        <gridLayout
          height="280"
          borderRadius="10"
          className="bg-secondary"
          rows="auto, auto"
          columns="auto, *"
          margin="5 10"
          padding="10"
        >
          <label
            row="0"
            col="0"
            width="10"
            height="10"
            backgroundColor={tournee.couleur}
            borderRadius="5"
          />
          <label
            row="0"
            col="1"
            margin="0"
            fontWeight="700"
            className="text-primary"
            fontSize="18"
            text={tournee.ordre.toString()}
          />
          <label
            row="1"
            col="0"
            colSpan="2"
            margin="0"
            className="text-secondary"
            fontSize="14"
            textWrap="true"
            text={tournee.tournee}
          />
        </gridLayout>
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

