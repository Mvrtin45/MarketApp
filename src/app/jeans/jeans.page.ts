import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jeans',
  templateUrl: './jeans.page.html',
  styleUrls: ['./jeans.page.scss'],
})
export class JeansPage implements OnInit {

  constructor(private alertController: AlertController) {}

  ngOnInit() {
  }

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
