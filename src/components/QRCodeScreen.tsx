import * as React from 'react';
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { MainStackParamList } from '../NavigationParamList';

import * as Camera from "@nativescript/camera";
import { Button } from '@nativescript/core';
import { QRCodeService } from '../services/qrcode.service';

type QRCodeScreenProps = {
    route: RouteProp<MainStackParamList, 'QRCodeScreen'>
    navigation: FrameNavigationProp<MainStackParamList, 'QRCodeScreen'>
}
  
export function QRCodeScreen({ route, navigation }: QRCodeScreenProps) {

    const [imageSource, setImageSource] = React.useState<string | null>(null);
    const [result, setResult] = React.useState<string | null>(null);

    const takePicture = () => {
            Camera.requestPermissions().then(() => {
                Camera.takePicture({ width: 300, height: 300, keepAspectRatio: true }).then((imageAsset) => {
                setImageSource(imageAsset.android);
                QRCodeService.readQRCodeFromCamera(imageAsset.android).then((qrCodeResult) => {
                    setResult(qrCodeResult);
                });
            });
        });
    };

    return (
        <stackLayout>
            <button text="Prendre une photo" onTap={takePicture} />
            {imageSource && <image src={imageSource} width="300" height="300" />}
        </stackLayout>
    )
};
