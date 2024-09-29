import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  profileIdToDelete: string = '';
  postIdToDelete: string = '';
  contentIdToRestrict: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  deleteProfile() {
    this.presentAlert("El perfil se ha Eliminado Correctamente.");
  }


  deletePost() {
    this.presentAlert("Se eliminó la publicación.");
  }

  

  restrictContent() {
    this.presentAlert("Se Ha Restringido el contenido.");
  }

  async presentAlert(msj:string){
    const alert = await this.alertController.create({
      header: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
