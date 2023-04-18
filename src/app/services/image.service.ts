import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage, ref, uploadString, getDownloadURL } from '@angular/fire/storage';
import { AvatarService } from './avatar.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private avatarService: AvatarService
  ) { }


 async changeAvatar() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  async captureImage(): Promise<string | null> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const imageUrl = await this.saveImage(image.base64String);
      return imageUrl;
    }

    return null;
  }

  async saveImage(image: string): Promise<string | null> {
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const imageRef = ref(this.storage, 'image.jpg');
      try {
        await uploadString(imageRef, image, 'data_url');
        const url = await getDownloadURL(imageRef);
        loading.dismiss();
        console.log('Image uploaded successfully at:', url);
        return url;
      } catch (error) {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your image: ' + error.message,
          buttons: ['OK'],
        });
        await alert.present();
        return null;
      }
    }

    return null;
  }

}



 