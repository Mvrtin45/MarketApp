import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service'; // Servicio para manejar la base de datos

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];
  precioTotal: number = 0;
  subtotal: number = 0;
  usuarioId: number | null = null; // Cambia esto con el ID de usuario actual si lo tienes

  constructor(
    private bd: ServicebdService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // Validar si la base de datos está lista
      if (data) {
        // Suscribirse al observable 
        this.bd.fetchCarrito().subscribe(res => {
          this.productosCarrito = res;
        });
      }
    });
    await this.obtenerUsuarioActual();
    if (this.usuarioId !== null) {
      this.cargarCarrito();
    } else {
      this.presentAlert('Error', 'No se pudo obtener el usuario actual.');
    }
  }

  async obtenerUsuarioActual() {
    try {
      const usuario = await this.bd.obtenerUsuarioActual();
      if (usuario) {
        this.usuarioId = usuario.usuario_id;
      } else {
        this.presentAlert('Error', 'Usuario no encontrado.');
      }
    } catch (error) {
      this.presentAlert('Error', 'Error al obtener el usuario actual.');
    }
  }


  async cargarCarrito() {
    if (this.usuarioId !== null) {
      try {
        const productos = await this.bd.obtenerProductosCarrito(this.usuarioId);
        this.productosCarrito = Array.isArray(productos) ? productos : []; // Asegurarse de que sea un array
        this.calcularTotal();
      } catch (error) {
        const errorMessage = (error as Error).message || error;
        console.error('Detalles del error al cargar productos del carrito:', errorMessage);
        this.presentAlert('Error', `Error al cargar productos del carrito: ${errorMessage}`);
        this.productosCarrito = [];
      }
    }
  }

  async eliminarProducto(index: number) {
    const productoId = this.productosCarrito[index].producto_id;
    if (this.usuarioId !== null) {
      try {
        await this.bd.eliminarProductoCarrito(this.usuarioId, productoId);
        this.productosCarrito.splice(index, 1);
        this.calcularTotal();
        this.presentAlert('Producto eliminado', 'El producto ha sido eliminado del carrito.');
      } catch (error) {
        this.presentAlert('Error', 'Error al eliminar el producto del carrito.');
      }
    }
  }

  async vaciarCarrito() {
    if (this.usuarioId !== null) {
      try {
        await this.bd.vaciarCarrito(this.usuarioId);
        this.productosCarrito = [];
        this.precioTotal = 0;
        this.presentAlert('Carrito vacío', 'Todos los productos han sido eliminados del carrito.');
      } catch (error) {
        this.presentAlert('Error', 'Error al vaciar el carrito.');
      }
    }
  }

  calcularTotal() {
    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      producto.subtotal = producto.precio * (producto.cantidad || 1); // Manejar cantidad indefinida
      return total + producto.subtotal;
    }, 0);
    this.precioTotal = this.subtotal;
  }

  async Pago() {
    await this.router.navigate(['/pago']);
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }
}