import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-zapasjordanretro3',
  templateUrl: './zapasjordanretro3.page.html',
  styleUrls: ['./zapasjordanretro3.page.scss'],
})
export class Zapasjordanretro3Page implements OnInit {

  constructor(private alertController: AlertController) { }

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

}
