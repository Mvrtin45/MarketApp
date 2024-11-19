import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MonedaService } from '../services/moneda.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];  // Lista de productos en el carrito
  subtotal: number = 0;  // Subtotal del carrito
  precioTotal: number = 0;  // Precio total del carrito
  usuarioId!: number;  // Variable para almacenar el ID del usuario
  carritoSubscription: Subscription | null = null;  // Suscripción al observable del carrito

 // API EXCHANGE
  Monedas: string[] = ["USD", "EUR", "CLP", "ARS", "MXN", "BRL", "GBP", "AUD", "CAD", "JPY", "HKD", "PYG", "UYU"];
  MonedaBase: string = "CLP"; // Peso Chileno por defecto
  MonedaDefecto: string = "USD"; // Dólar por defecto
  TazaConversion: number = 0;
  TotalConvertido: number = 0; // Total

  constructor(
    private alertController: AlertController,  
    private bd: ServicebdService,
    private router: Router,
    private apiService: MonedaService, 
    private storage: NativeStorage,
    private menu:MenuController
  ) {}

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.carritoSubscription = this.bd.fetchCarrito().subscribe(res => {
          this.productosCarrito = res;
          this.calcularTotales();
        });
      }
    });
    this.convertirMoneda();
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    this.obtenerUsuarioActual();

    this.storage.getItem('usuario_id').then(data=>{
      this.usuarioId = data;

      // llama a la consulta solo cuando se haya obtenido el id
      return this.bd.miPerfil(this.usuarioId);

    }).then(data => {
      if (data) {
        this.usuarioId = data.usuario_id;
      }
    });
  }

  convertirMoneda() {

    if(!this.MonedaDefecto){
      this.mostrarAlerta('Error', 'Debe seleccionar una moneda para la conversion');
    }
    this.apiService.obtenerValorMoneda(this.MonedaBase).subscribe(
      (data) => {
          const tasaConversion = data.rates[this.MonedaDefecto] // Obtener la tasa de cambio para la moneda de destino
          if (tasaConversion) {
            this.TazaConversion = tasaConversion;
            this.TotalConvertido = this.precioTotal * this.TazaConversion; // Realizar la conversión
          } else {
              console.error('La moneda de destino no está disponible.');
          }
      },
      (error) => {
          console.error('Error al obtener tasas de cambio:', error);
      }
    );
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
        const subtotalProducto = producto.precio * producto.cantidad; // Precio por cantidad
        this.subtotal += subtotalProducto;
      });
      this.precioTotal = this.subtotal; // Total inicial en CLP
      this.TotalConvertido = this.precioTotal * this.TazaConversion; // Actualizar el total convertido
  }

  // Eliminar un producto del carrito
  eliminarProducto(productoId: number) {
    if (this.usuarioId !== null) {
      this.bd.eliminarProductoDelCarrito(productoId)
        .then(() => {
          // Recargar el carrito después de eliminar
          this.cargarCarrito();
        })
        .catch(error => {
          console.log('Error al eliminar el producto', error);
          this.mostrarAlerta('Error', 'Hubo un problema al eliminar el producto. Intenta nuevamente.');
        });
    }
  }

  // Vaciar el carrito
  vaciarCarrito() {
    if (this.usuarioId !== null) {
      this.bd.vaciarCarrito().then(() => {
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
    }
  }
}
