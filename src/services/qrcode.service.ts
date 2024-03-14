import * as fs from "@nativescript/core/file-system";
import { BarcodeScanner } from "nativescript-barcodescanner";


class _QRCodeService {
    async readQRCodeFromCamera(image: string): Promise<string | null> {
        try {
            const response = await fetch('http://api.qrserver.com/v1/read-qr-code/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: image,
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data[0] && data[0].symbol && data[0].symbol[0] && data[0].symbol[0].data) {
                    return data[0].symbol[0].data;
                }
            }
        } catch (error) {
            console.error('Error reading QR code:', error);
        }
        return null;

    }

    function scanQRCode() {
        const barcodescanner = new BarcodeScanner();
    
        barcodescanner.scan({
            formats: "QR_CODE", // Seulement le format QR_CODE
            message: "Scannez le code QR avec l'appareil photo", // Message affiché lors de l'utilisation de l'appareil photo
            showFlipCameraButton: true, // Bouton pour changer de caméra
            showTorchButton: true, // Bouton pour allumer/éteindre la lampe torche
            torchOn: false, // Par défaut, la lampe torche est éteinte
            orientation: "portrait", // Orientation de la caméra (portrait ou paysage)
            resultDisplayDuration: 5000, // Durée d'affichage du résultat (0 pour désactiver)
            openSettingsIfPermissionWasPreviouslyDenied: true // Demande d'ouverture des paramètres si l'autorisation a été précédemment refusée
        }).then((result) => {
            alert({
                title: "Résultat du scan",
                message: "Format: " + result.format + ",\nValeur: " + result.text,
                okButtonText: "OK"
            });
        }, (errorMessage) => {
            // Échec du scan
            console.log("Aucun scan. " + errorMessage);
        });
    }
}

export const QRCodeService = new _QRCodeService();
