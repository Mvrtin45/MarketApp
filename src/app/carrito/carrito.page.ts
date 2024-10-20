import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];
  precioTotal: number = 0;
  subtotal: number = 0;

  constructor(
    private storage: NativeStorage,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  async recargarDatos() {
    await this.cargarCarrito();
  }

  cargarCarrito() {
    this.storage.getItem('productos_carrito')
      .then((productos) => {
        if (productos) {
          this.productosCarrito = productos;
          this.calcularTotal();
        } else {
          console.log('No hay productos en el carrito');
          this.productosCarrito = [];
        }
      })
      .catch(() => {
        console.log('Error al cargar productos del carrito');
        this.productosCarrito = [];
      });
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.actualizarCarrito();
  }

  vaciarCarrito() {
    this.productosCarrito = [];
    this.precioTotal = 0;
    this.actualizarCarrito();
  }

  increaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad < (producto.stock || Infinity)) {
      producto.cantidad++;
      this.calcularTotal();
      this.actualizarCarrito();
    } else {
      console.log('No hay suficiente stock disponible');
    }
  }

  decreaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();
      this.actualizarCarrito();
    } else {
      console.log('No puedes disminuir más la cantidad, debe ser al menos 1');
    }
  }

  calcularTotal() {
    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      producto.subtotal = producto.precio * producto.cantidad; // Guardar subtotal de cada producto
      return total + producto.subtotal; // Sumar al subtotal del carrito
    }, 0);

    this.precioTotal = this.subtotal;
  }

  actualizarCarrito() {
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        console.log('Carrito actualizado correctamente');
        this.calcularTotal(); // Recalcular total después de actualizar
      })
      .catch(error => {
        console.error('Error al actualizar el carrito:', error);
      });
  }

  Pago() {
    this.storage.setItem('precio_total_carrito', this.precioTotal)
      .then(() => {
        this.router.navigate(['/pago']);
      })
      .catch(error => console.error('Error al preparar los datos para el pago', error));
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