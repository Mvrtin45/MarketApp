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
    // Verifica el estado de la base de datos y luego carga las ventas
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.cargarVentas();
      }
    });
  }

  ionViewWillEnter() {
    // Vuelve a cargar las ventas cada vez que se entra a la página
    this.cargarVentas();
  }

  cargarVentas() {
    // Llama al método `ObtenerVentas` del servicio y asigna el resultado a `ventas`
    this.bd.ObtenerVentas().then(data => {
      this.ventas = data;
    }).catch(error => {
      console.error("Error al cargar ventas:", error);
      this.presentAlert("Error", "No se pudieron cargar las ventas. Intenta de nuevo.");
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
