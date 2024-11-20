import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-ventas',
  templateUrl: './admin-ventas.page.html',
  styleUrls: ['./admin-ventas.page.scss'],
})
export class AdminVentasPage implements OnInit {
  
  ventas: any[] = [];  // Arreglo para almacenar las ventas obtenidas

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarVentas();
  }

  // Método para cargar todas las ventas
  cargarVentas() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchVentas().subscribe(res => {
          this.ventas = res;
        });
      }
    });
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
