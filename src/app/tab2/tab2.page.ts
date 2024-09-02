import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private alertController: AlertController) {}

  async showAddAlert() {
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: 'El producto ha sido agregado al carrito de compra.',
      buttons: ['OK'],
        
    });

    await alert.present();
  }

  async showFavoriteAlert() {
    const alert = await this.alertController.create({
      header: 'Favoritos',
      message: 'El producto ha sido agregado a favoritos.',
      buttons: ['OK'],
       
    });

    await alert.present();
  }
}