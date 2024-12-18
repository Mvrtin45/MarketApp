import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
  compraExitosa: boolean = false;
  productosComprados: any[] = [];

  constructor(
    private bd: ServicebdService,
    private storage: NativeStorage,
    private navCtrl: NavController,
    private alertController: AlertController // Agregado para mostrar alertas
  ) {}

  ngOnInit() {
    console.log("Inicializando la página de compra");
    this.storage.getItem('usuario_id').then(async (usuarioId) => {
      if (usuarioId) {
        await this.obtenerProductosComprados(usuarioId);
      } else {
        this.mostrarAlerta('Error', 'No se encontró el usuario ID. Inténtalo nuevamente.');
        this.compraExitosa = false;
      }
    }).catch((error) => {
      console.error("Error al obtener el usuario_id de storage:", error);
      this.mostrarAlerta('Error', 'Hubo un problema al acceder a los datos de usuario.');
      this.compraExitosa = false;
    });
  }

  async obtenerProductosComprados(usuarioId: number) {
    try {
      this.productosComprados = await this.bd.getProductosCarrito(usuarioId);
      if (this.productosComprados.length > 0) {
        this.compraExitosa = true;
      } else {
        this.mostrarAlerta('Información', 'No se encontraron productos en el carrito.');
        this.compraExitosa = false;
      }
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
      this.mostrarAlerta('Error', 'No se pudieron obtener los productos del carrito.');
      this.compraExitosa = false;
    }
  }

  async vaciarCarritoYVolver() {
    try {
      const usuarioId = await this.storage.getItem('usuario_id');
      if (usuarioId) {
        await this.bd.vaciarCarrito(usuarioId);
        this.navCtrl.navigateForward('/tabs/perfil', { queryParams: { usuario_id: usuarioId } });
      } else {
        this.mostrarAlerta('Error', 'No se encontró el usuario ID. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error al vaciar el carrito y redirigir:', error);
      this.mostrarAlerta('Error', 'Hubo un problema al vaciar el carrito.');
    }
  }

  volverAlInicio() {
    this.vaciarCarritoYVolver();
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}