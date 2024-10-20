import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor() {}

  // Función para tomar una foto
  async takePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 90,
      });
      return image.webPath || '';
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      throw error;
    }
  }

  // Función para elegir una imagen de la galería
  async pickImage(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 90,
      });
      return image.webPath || '';
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      throw error;
    }
  }

  
}
