import * as React from 'react';
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { MainStackParamList } from '../NavigationParamList';

import * as Camera from "@nativescript/camera";
import { BarcodeScanner } from 'nativescript-barcodescanner';

type QRCodeScreenProps = {
    route: RouteProp<MainStackParamList, 'QRCodeScreen'>
    navigation: FrameNavigationProp<MainStackParamList, 'QRCodeScreen'>
}
  
export function QRCodeScreen({ route, navigation }: QRCodeScreenProps) {

    const [scannedQRCode, setScannedQRCode] = React.useState<string | null>(null);
    const barcodeScanner = new BarcodeScanner();

    const handleScanQRCode = () => {
        barcodeScanner.scan({
            formats: "QR_CODE",
            cancelLabel: "Annuler",
            message: "Veuillez scanner le code QR",
            showFlipCameraButton: true,
            torchOn: false,
            resultDisplayDuration: 0,
            openSettingsIfPermissionWasPreviouslyDenied: true,
        }).then((result) => {
            setScannedQRCode(result.text);
        }).catch((error) => {
            console.error("Error scanning QR code:", error);
        });
    };

    return (
        <stackLayout>
            {/* Affichage de l'image du QR code scanné */}
            {scannedQRCode && <image src={scannedQRCode} width="300" height="300" />}

            {/* Bouton pour déclencher la numérisation */}
            <button text="Scanner QR Code" onTap={handleScanQRCode} />
        </stackLayout>
    );
};

/* <button text="Prendre une photo" onTap={takePicture} />
{imageSource && <image src={imageSource} width="300" height="300" />} */
            
        