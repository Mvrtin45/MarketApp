import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];  // Lista de productos en el carrito
  subtotal: number = 0;  // Subtotal del carrito
  precioTotal: number = 0;  // Precio total del carrito
  usuarioId: number | null = null;  // Variable para almacenar el ID del usuario
  carritoSubscription: Subscription | null = null;  // Suscripción al observable del carrito

  constructor(
    private alertController: AlertController,  
    private bd: ServicebdService,
    private router: Router  
  ) {}

  ngOnInit() {
    // Nos suscribimos al observable para recibir actualizaciones automáticamente
    this.carritoSubscription = this.bd.productosCarrito$.subscribe((productos) => {
      this.productosCarrito = productos;
      this.calcularTotales();
      this.obtenerUsuarioActual();
    });
  }


  // Obtener el usuario actual
  async obtenerUsuarioActual() {
    try {
      const usuario = await this.bd.obtenerUsuarioActual();
      if (usuario) {
        this.usuarioId = usuario.usuario_id;  // Guardar el ID del usuario
        console.log('Usuario actual:', usuario);
        this.cargarCarrito();  // Cargar el carrito después de obtener el usuario
      } else {
        console.log('No se encontró el usuario actual.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  // Cargar los productos del carrito del usuario
  cargarCarrito() {
    if (this.usuarioId !== null) {
      this.bd.getProductosCarrito(this.usuarioId).then((productos: any[]) => {
        this.productosCarrito = productos;
        this.calcularTotales();  // Calcular los totales después de cargar los productos
      }).catch(error => {
        console.log('Error al cargar carrito', error);
        this.mostrarAlerta('Error', 'Hubo un problema al cargar tu carrito. Por favor, inténtalo de nuevo.');
      });
    }
  }

  // Calcular el subtotal y total
  calcularTotales() {
    this.subtotal = 0;
    this.precioTotal = 0;
    this.productosCarrito.forEach(producto => {
      const subtotalProducto = producto.precio * producto.cantidad;
      this.subtotal += subtotalProducto;
    });
    this.precioTotal = this.subtotal;  // Si tienes un descuento o cargos adicionales, agrégalo aquí
  }

  // Eliminar un producto del carrito
  eliminarProducto(productoId: number) {
    if (this.usuarioId !== null) {
      this.bd.eliminarProductoDelCarrito(productoId).then(() => {
        // El carrito se actualizará automáticamente por la suscripción
      }).catch(error => {
        console.log('Error al eliminar el producto', error);
        this.mostrarAlerta('Error', 'Hubo un problema al eliminar el producto. Intenta nuevamente.');
      });
    }
  }

  // Vaciar el carrito
  vaciarCarrito() {
    if (this.usuarioId !== null) {
      this.bd.vaciarCarrito().then(() => {
        // El carrito se actualizará automáticamente por la suscripción
      }).catch(error => {
        console.log('Error al vaciar el carrito', error);
        this.mostrarAlerta('Error', 'Hubo un problema al vaciar el carrito. Intenta nuevamente.');
      });
    }
  }

  // Mostrar una alerta con un mensaje
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Proceder al pago
  async procederAlPago() {
    if (this.productosCarrito.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito vacío',
        message: 'No puedes proceder al pago con un carrito vacío.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.router.navigate(['/pago']);
      console.log('Procediendo al pago...');
    }
  }
}
