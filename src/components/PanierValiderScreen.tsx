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

type PanierValiderProps = {
    route: RouteProp<MainStackParamList, 'PanierValiderScreen'>
    navigation: FrameNavigationProp<MainStackParamList, 'PanierValiderScreen'>
}
  
export function PanierValiderScreen({ route, navigation }: PanierValiderProps) {
  

    const [scannedQRCode, setScannedQRCode] = useState<string | null>(null);
    const [heureValider, setHeureValider] = useState<Date>();
    const barcodeScanner = new BarcodeScanner();

    const tournee_id = route.params.tourneeId;
    const distribution_id = route.params.distributionsId;

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
            setScannedQRCode(result.text);
            setHeureValider(new Date())
        }).catch((error) => {
            console.error("Error scanning QR code:", error);
        });
    };


    const NavigateQrCode = (args: ItemEventData) => {
        navigation.navigate('QRCodeScreen', {
          tourneeId: tournee_id,
          distributionsId: distribution_id,
        })
      }

    return (
        <stackLayout>
            <label
                fontSize="35"
                textWrap="true"
                text='Retour'
                onTap={NavigateQrCode}
            />
            <button text="Scanner QR Code" onTap={handleScanQRCode} />
            {heureValider ? (
                <stackLayout>
                    <label text={`Valider à : ${heureValider.getHours()} Heure et ${heureValider.getMinutes()} minutes `} fontSize={35} />
                </stackLayout>
             ) : (
                <label text="En attente de l'arrivée.." fontSize={35}  />
            )}
        </stackLayout>
    );
};

/* <button text="Prendre une photo" onTap={takePicture} />
{imageSource && <image src={imageSource} width="300" height="300" />} */
            
        