import * as fs from "@nativescript/core/file-system";


class _QRCodeService {
    async readQRCodeFromCamera(image: string): Promise<string | null> {
        try {
            const imagePath = fs.path.join(fs.knownFolders.temp().path, `camera_temp.jpg`);
            image.saveToFile(imagePath, "jpeg");

            const apiUrl = `http://api.qrserver.com/v1/read-qr-code/`;
            const formData = new FormData();
            formData.append("file", fs.File.fromPath(imagePath).readSync(), "camera.jpg");

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Failed to read QR code: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.length > 0 && data[0].type === 'qrcode' && data[0].symbol && data[0].symbol.length > 0) {
                return data[0].symbol[0].data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error reading QR code:', error);
            return null;
        }
    }
}

export const QRCodeService = new _QRCodeService();
