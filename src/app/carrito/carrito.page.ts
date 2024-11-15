import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { Carrito } from '../services/carrito';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: Carrito[] = [];
  precioTotal: number = 0;
  subtotal: number = 0;
  usuarioId: number | null = null;

  constructor(
    private bd: ServicebdService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Verifica si la base de datos está lista
    this.bd.dbState().subscribe(async (data) => {
      if (data) {
        console.log("Base de datos lista.");
        await this.obtenerUsuarioActual(); // Asegurarse de obtener el usuario actual primero
        // Verificamos si usuarioId no es null antes de llamar a fetchCarrito
        if (this.usuarioId !== null) {
          // Subscribirse al observable de los productos del carrito
          this.bd.fetchCarrito(this.usuarioId).subscribe(
            (productos) => {
              // Filtramos los productos por el usuario actual
              this.productosCarrito = productos.filter(producto => producto.usuario_id === this.usuarioId);
              console.log("Productos del carrito:", this.productosCarrito);
              if (this.productosCarrito.length === 0) {
                console.warn("El carrito está vacío.");
              }
              // Calculamos el total y subtotal de los productos en el carrito
              this.calcularTotal();
            },
            (error) => {
              console.error("Error al cargar los productos del carrito:", error);
              this.presentAlert('Error', 'Hubo un problema al cargar los productos del carrito.');
              this.productosCarrito = [];
            }
          );
        } else {
          console.warn("ID de usuario no disponible. No se puede cargar el carrito.");
        }
      } else {
        console.warn("Base de datos no está lista.");
      }
    });
  }

  async obtenerUsuarioActual() {
    try {
      const usuario = await this.bd.obtenerUsuarioActual();
      if (usuario) {
        this.usuarioId = usuario.usuario_id;
        console.log("ID de usuario obtenido:", this.usuarioId);
      } else {
        this.presentAlert('Error', 'Usuario no encontrado.');
      }
    } catch (error) {
      this.presentAlert('Error', 'Error al obtener el usuario actual.');
    }
  }

  cargarCarrito() {
    if (this.usuarioId !== null) {
      // Ahora pasamos 'this.usuarioId' a 'fetchCarrito'
      from(this.bd.fetchCarrito(this.usuarioId)).pipe(
        tap((productos) => {
          this.productosCarrito = productos.filter(producto => producto.usuario_id === this.usuarioId);
          console.log("Productos pendientes en el carrito:", this.productosCarrito);
  
          if (this.productosCarrito.length === 0) {
            console.warn("El carrito está vacío.");
          }
  
          this.calcularTotal(); // Calcular el total de los productos
        })
      ).subscribe({
        error: (error) => {
          console.error("Error al cargar los productos pendientes del carrito:", error);
          this.presentAlert('Error', 'Hubo un problema al cargar los productos del carrito.');
          this.productosCarrito = [];
        }
      });
    }
  }

  async eliminarProducto(index: number) {
    const productoId = this.productosCarrito[index].producto_id;
    const carritoId = this.productosCarrito[index].carrito_id;

    if (this.usuarioId !== null && carritoId !== null) {
      try {
        await this.bd.eliminarProductoCarrito(this.usuarioId, productoId);

        if (carritoId !== null) {
          // Registrar en historial
          await this.bd.registrarHistorialCarrito(this.usuarioId, carritoId, productoId, 'eliminar');
        } else {
          console.error('No se puede registrar en el historial, carrito_id es null');
        }

        this.productosCarrito.splice(index, 1);
        console.log("Producto eliminado del carrito. Carrito actualizado:", this.productosCarrito);
        this.calcularTotal();
        this.presentAlert('Producto eliminado', 'El producto ha sido eliminado del carrito.');
      } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        this.presentAlert('Error', 'Error al eliminar el producto del carrito.');
      }
    }
  }

  async vaciarCarrito() {
    if (this.usuarioId !== null) {
      try {
        await this.bd.vaciarCarrito(this.usuarioId);

        // Registrar en historial
        for (const producto of this.productosCarrito) {
          const carritoId = producto.carrito_id;

          if (carritoId !== null) {
            await this.bd.registrarHistorialCarrito(this.usuarioId, carritoId, producto.producto_id, 'vaciar');
          } else {
            console.error('El carrito_id es nulo, no se puede registrar en el historial');
          }
        }

        // Vaciar carrito
        this.productosCarrito = [];
        this.precioTotal = 0;
        console.log("Carrito vacío.");
        this.presentAlert('Carrito vacío', 'Todos los productos han sido eliminados del carrito.');
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        this.presentAlert('Error', 'Error al vaciar el carrito.');
      }
    }
  }

  calcularTotal() {
    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      const precio = producto.precio ?? 0;
      const cantidad = producto.cantidad ?? 1;
      producto.subtotal = precio * cantidad;
      return total + producto.subtotal;
    }, 0);

    this.precioTotal = this.subtotal;
    console.log("Subtotal calculado:", this.subtotal);
    console.log("Total calculado:", this.precioTotal);
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
