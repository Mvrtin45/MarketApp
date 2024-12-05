import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("Inicializando la página de compra");
    this.storage.getItem('usuario_id').then(async (usuarioId) => {
      if (usuarioId) {
        await this.obtenerProductosComprados(usuarioId);
      } else {
        console.log("No se encontró el usuario ID");
        this.compraExitosa = false;
      }
    }).catch((error) => {
      console.error("Error al obtener el usuario_id de storage:", error);
      this.compraExitosa = false;
    });
  }

  async obtenerProductosComprados(usuarioId: number) {
    try {
      this.productosComprados = await this.bd.getProductosCarrito(usuarioId);
      if (this.productosComprados.length > 0) {
        this.compraExitosa = true;
      } else {
        console.log("No se encontraron productos en el carrito");
        this.compraExitosa = false;
      }
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
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
        console.log("No se encontró el usuario ID");
      }
    } catch (error) {
      console.error('Error al vaciar el carrito y redirigir:', error);
    }
  }

  volverAlInicio() {
    this.vaciarCarritoYVolver();
  }
}