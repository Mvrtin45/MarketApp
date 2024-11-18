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
  usuarioId: number | null = null;  // Ahora es null inicialmente, ya que obtendrás el ID dinámicamente

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

    // Obtener el usuarioId de manera dinámica
    this.obtenerUsuarioId();
  }

  // Método para obtener el usuarioId del usuario autenticado
  async obtenerUsuarioId() {
    try {
      const usuario = await this.bd.obtenerUsuarioActual();  // Llamada al servicio que te proporciona el usuario actual
      if (usuario) {
        this.usuarioId = usuario.usuario_id;  // Asignamos el usuarioId dinámicamente
        console.log('Usuario actual:', usuario);
      } else {
        console.log('No se encontró el usuario autenticado');
        this.presentAlert('Error', 'No se encontró el usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario', error);
      this.presentAlert('Error', 'Ocurrió un error al obtener el usuario.');
    }
  }

  // Método para cargar los datos de la publicación
  cargarPublicacion(id: number) {
    this.bd.getPublicacionById(id).then(data => {
      if (data) {
        this.publicacion = data;
      } else {
        console.log('No se encontró la publicación');
        this.presentAlert('Error', 'No se encontró la publicación solicitada.');
      }
    }).catch(error => {
      console.error('Error al cargar la publicación', error);
      this.presentAlert('Error', 'Ocurrió un error al cargar la publicación.');
    });
  }

  // Método para agregar el producto al carrito sin registrar en el historial
  addToCart(productoId: number) {
    if (this.usuarioId !== null) {  // Asegurarse de que el usuarioId está disponible
      this.bd.insertarProductoCarrito(this.usuarioId, productoId)
        .then(() => {
          this.presentAlert('Éxito', 'Producto agregado al carrito');  // Navegar al carrito para ver los cambios
        })
        .catch((error) => {
          this.presentAlert('Error', 'No se pudo agregar el producto al carrito');
        });
    } else {
      this.presentAlert('Error', 'No se ha encontrado el usuario autenticado.');
    }
  }

  // Mostrar la alerta cuando el producto se agrega al carrito
  async showAddAlert() {
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: 'El producto ha sido agregado al carrito de compra.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Método para mostrar alertas personalizadas
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}