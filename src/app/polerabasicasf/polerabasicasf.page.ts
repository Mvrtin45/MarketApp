import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-polerabasicasf',
  templateUrl: './polerabasicasf.page.html',
  styleUrls: ['./polerabasicasf.page.scss'],
})
export class PolerabasicasfPage implements OnInit {

  // Definimos el producto directamente como objeto
  producto = {
    nombre: 'Polera Básica Slim Fit',
    estado: 'Nuevo',
    precio: 23990,
    foto: '../assets/icon/polerabasica.jpg',
    cantidad: 1, // La cantidad inicial
    stock: 10 // Ejemplo de stock disponible
  };

  constructor(
    private alertController: AlertController,
    private storage: NativeStorage
  ) { }

  ngOnInit() {
  }

  async addToCart() { 
    const productosCarrito: any[] = await this.cargarCarrito(); // Usa any[] para evitar el error

    const existingProductIndex = productosCarrito.findIndex(item => item.nombre === this.producto.nombre);

    if (existingProductIndex >= 0) {
      // Si ya existe, aumentar la cantidad
      productosCarrito[existingProductIndex].cantidad++;
    } else {
      // Si no existe, agregar el producto al carrito
      productosCarrito.push({...this.producto}); // Usa spread para evitar referencia directa
    }

    await this.storage.setItem('productos_carrito', productosCarrito);
    await this.showAddAlert();
  }

  async cargarCarrito(): Promise<any[]> { // Retorna un array de any
    try {
      const productos = await this.storage.getItem('productos_carrito');
      return productos || []; // Devuelve el carrito o un array vacío si no hay productos
    } catch (error) {
      console.log('Error al cargar productos del carrito', error);
      return []; // Retorna un array vacío en caso de error
    }
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
