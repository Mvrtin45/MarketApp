import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { MonedaService } from '../services/moneda.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Monedas: string[] = ["USD", "EUR", "CLP", "ARS", "MXN", "BRL", "GBP", "AUD", "CAD", "JPY", "HKD", "PYG", "UYU"];
  MonedaBase: string = "CLP";  // Peso Chileno por defecto
  MonedaDefecto: string = "USD";  // Dólar por defecto

  CantidadConv: number = 1;
  TazaConversion: number = 0;
  Resultado: number = 0;

  constructor(
    private alertController: AlertController,
    private storage: NativeStorage,
    private apiService: MonedaService
  ) {}

  ngOnInit() {
    
  }


  async addToCart(nombre: string, estado: string, precio: number, foto: string, vendedor: string) { 
    const productosCarrito: any[] = await this.cargarCarrito();

    const existingProductIndex = productosCarrito.findIndex(item => item.nombre === nombre && item.vendedor === vendedor);

    if (existingProductIndex >= 0) {
      // Si ya existe, aumentar la cantidad
      productosCarrito[existingProductIndex].cantidad++;
    } else {
      // Si no existe, agregar el producto al carrito
      productosCarrito.push({
        nombre: nombre,
        estado: estado,
        precio: precio,
        foto: foto,
        vendedor: vendedor, 
        cantidad: 1, // La cantidad inicial
        stock: 10 // Ejemplo de stock disponible
      });
    }

    await this.storage.setItem('productos_carrito', productosCarrito);
    await this.showAddAlert();
  }

  async cargarCarrito(): Promise<any[]> { 
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

  async showFavoriteAlert() {
    const alert = await this.alertController.create({
      header: 'Favoritos',
      message: 'El producto ha sido agregado a favoritos.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}