import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-zapatosvestir',
  templateUrl: './zapatosvestir.page.html',
  styleUrls: ['./zapatosvestir.page.scss'],
})
export class ZapatosvestirPage implements OnInit {

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
