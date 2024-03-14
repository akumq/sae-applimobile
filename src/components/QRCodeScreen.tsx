import * as React from 'react';
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { MainStackParamList } from '../NavigationParamList';

import * as Camera from "@nativescript/camera";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { useEffect, useState } from 'react';
import { LivraisonModel, TourneeModelDetails } from '../models/tournee.model';
import { TourneeService } from '../services/tournee.services';
import { ListView } from 'react-nativescript';

type QRCodeScreenProps = {
    route: RouteProp<MainStackParamList, 'QRCodeScreen'>
    navigation: FrameNavigationProp<MainStackParamList, 'QRCodeScreen'>
}
  
export function QRCodeScreen({ route, navigation }: QRCodeScreenProps) {
  

    const [scannedQRCode, setScannedQRCode] = useState<string | null>(null);
    const [heureArrivee, setHeureArrivee] = useState<Date>();
    const [heureDepart, setHeureDepart] = useState<Date>();
    const [paniers,setPaniers] = useState<LivraisonModel[]>([]);
    const barcodeScanner = new BarcodeScanner();

    const tournee_id = route.params.tourneeId;
    const distribution_id = route.params.distributionsId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tourneeData: TourneeModelDetails = await TourneeService.getTourneeDetails(tournee_id);
                setPaniers(tourneeData[0].distribution.find(distribution => distribution.distribution_id === distribution_id).livraisons)
                console.log(paniers)
            } catch(error) {
                console.error("Error Depots:", error);
            }
        };
        fetchData();
    }, []);

    const handleScanQRCode = () => {
        barcodeScanner.scan({
            formats: "QR_CODE",
            cancelLabel: "Annuler",
            message: "Veuillez scanner le code QR",
            showFlipCameraButton: true,
            torchOn: false,
            resultDisplayDuration: 5000,
            openSettingsIfPermissionWasPreviouslyDenied: true,
        }).then((result) => {
            if (scannedQRCode){
                if(scannedQRCode == result.text){
                    console.log(result)
                    setScannedQRCode(result.text);
                    console.log(Date.now())
                    setHeureDepart(new Date())
                }else{
                    console.log(result)
                    setScannedQRCode(result.text);
                    console.log(Date.now())
                    setHeureArrivee(new Date())
                }
            }else{
                console.log(result)
                setScannedQRCode(result.text);
                console.log(Date.now())
                setHeureArrivee(new Date())
            }

        }).catch((error) => {
            console.error("Error scanning QR code:", error);
        });
    };

    const NavigateTournee = (args: ItemEventData) => {
        navigation.navigate('HomeScreen');
    }

    const NavigatePanier = (args: ItemEventData) => {
        navigation.navigate('PanierValiderScreen', {
          tourneeId: tournee_id,
          distributionsId: distribution_id,
        })
      }

    const paniersFactory = (livraison: LivraisonModel) : JSX.Element => {
        return <label text={`${livraison.count} | ${livraison.panier}`} fontSize="24" />;
    }
    
    return (
        <stackLayout>
            <label
                fontSize="35"
                textWrap="true"
                text='Home'
                onTap={NavigateTournee}
            />
            <button text="Scanner QR Code" onTap={handleScanQRCode} />
            {heureArrivee ? (
                <stackLayout>
                    <label text={`Arrivée : ${heureArrivee.getHours()}:${heureArrivee.getMinutes()} `} fontSize={52} />
                    {heureDepart ? (
                        <label text={`Départ : ${heureDepart.getHours()}:${heureDepart.getMinutes()} `} fontSize={52} />
                    ) : ( 
                        <label text={"En attente de depart..."} fontSize={25}  />
                    )}
                </stackLayout>
             ) : (
                <label text="En attente de l'arrivée.." fontSize={35}  />
            )}
            <ListView
                items={paniers}
                cellFactory={paniersFactory}
                onItemTap={NavigatePanier}
                separatorColor="transparent"
                height="100%"
            />
        </stackLayout>
    );
};

/* <button text="Prendre une photo" onTap={takePicture} />
{imageSource && <image src={imageSource} width="300" height="300" />} */
            
        