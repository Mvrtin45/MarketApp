import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage implements OnInit {
  publicacion: any;

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const productoId = +this.route.snapshot.paramMap.get('producto_id')!;
    if (productoId) {
      this.cargarPublicacion(productoId);
    }
  }

  cargarPublicacion(id: number) {
    this.bd.getPublicacionById(id).then(data => {
      if (data) {
        this.publicacion = data;
      } else {
        console.log('No se encontró la publicación');
      }
    }).catch(error => {
      console.error('Error al cargar la publicación', error);
    });
  }

  async addToCart(nombre: string, estado: string, precio: number, foto: string, vendedor: string) { 
    const productosCarrito: any[] = await this.cargarCarrito();

    const existingProductIndex = productosCarrito.findIndex(item => item.nombre === nombre && item.vendedor === vendedor);

    if (existingProductIndex >= 0) {
      productosCarrito[existingProductIndex].cantidad++;
    } else {
      productosCarrito.push({
        nombre: nombre,
        estado: estado,
        precio: precio,
        foto: foto,
        vendedor: vendedor,
        cantidad: 1,
        stock: 10 
      });
    }

    await this.storage.setItem('productos_carrito', productosCarrito);
    await this.showAddAlert();
  }

  async cargarCarrito(): Promise<any[]> { 
    try {
      const productos = await this.storage.getItem('productos_carrito');
      return productos || [];
    } catch (error) {
      console.log('Error al cargar productos del carrito', error);
      return [];
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