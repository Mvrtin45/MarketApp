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

  // Indicador para saber si la compra fue exitosa
  compraExitosa: boolean = false;

  // Lista de productos comprados
  productosComprados: any[] = [];

  constructor(
    private bd: ServicebdService, 
    private storage: NativeStorage, 
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("Inicializando la página de compra");

    // Obtener el ID del usuario almacenado para poder cargar los productos
    this.storage.getItem('usuario_id').then(async (usuarioId) => {
      console.log("Usuario ID recuperado:", usuarioId);
      if (usuarioId) {
        // Obtenemos los productos del carrito
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

  // Método para obtener los productos comprados
  async obtenerProductosComprados(usuarioId: number) {
    console.log("Obteniendo productos para el usuario con ID:", usuarioId);
    try {
      // Llamamos a la función en el servicio del carrito para obtener los productos
      this.productosComprados = await this.bd.getProductosCarrito(usuarioId);
      console.log("Productos obtenidos:", this.productosComprados);

      // Si hay productos, marcamos la compra como exitosa
      if (this.productosComprados.length > 0) {
        this.compraExitosa = true;
      } else {
        this.compraExitosa = false;
        console.log("No se encontraron productos en el carrito");
      }
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
      this.compraExitosa = false;
    }
  }

  // Método para vaciar el carrito y redirigir al perfil
  async vaciarCarritoYVolver() {
    try {
      // Primero vaciamos el carrito
      const usuarioId = await this.storage.getItem('usuario_id');
      if (usuarioId) {
        await this.bd.vaciarCarrito(usuarioId); // Vaciar carrito usando un método en el servicio
        console.log("Carrito vaciado exitosamente");

        // Luego redirigimos al perfil
        this.navCtrl.navigateForward('/tabs/perfil', {
          queryParams: { usuario_id: usuarioId }
        });

      } else {
        console.log("No se encontró el usuario ID al intentar vaciar el carrito");
      }
    } catch (error) {
      console.error('Error al vaciar el carrito y redirigir:', error);
    }
  }

  // Método para volver al inicio (vaciar el carrito y redirigir al perfil)
  volverAlInicio() {
    console.log("Volviendo al inicio...");
    this.vaciarCarritoYVolver(); // Llamamos a la función para vaciar el carrito y redirigir
  }
}