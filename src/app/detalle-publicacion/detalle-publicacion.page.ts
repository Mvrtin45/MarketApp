import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage implements OnInit {
  publicacion: any;
  usuarioId: number = 1; // Asume que ya tienes el ID del usuario autenticado

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService,
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

  async addToCart(producto_id: number) {
    try {
      await this.bd.InsertarProductoCarrito(this.usuarioId, producto_id);
      this.showAddAlert();
    } catch (error) {
      console.error('Error al agregar producto al carrito', error);
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