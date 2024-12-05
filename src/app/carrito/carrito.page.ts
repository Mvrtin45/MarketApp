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
export class CarritoPage implements OnInit, OnDestroy {
  productosCarrito: any[] = [];
  subtotal: number = 0;
  precioTotal: number = 0;
  usuarioId!: number;
  carritoSubscription: Subscription | null = null;

  // API EXCHANGE
  Monedas: string[] = ["USD", "EUR", "CLP", "ARS", "MXN", "BRL", "GBP", "AUD", "CAD", "JPY", "HKD", "PYG", "UYU"];
  MonedaBase: string = "CLP"; // Peso Chileno por defecto
  MonedaDefecto: string = "USD"; // Dólar por defecto
  TazaConversion: number = 0;
  TotalConvertido: number = 0;

  constructor(
    private alertController: AlertController,  
    private bd: ServicebdService,
    private router: Router,
    private apiService: MonedaService, 
    private storage: NativeStorage,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.menu.enable(true);
    this.obtenerUsuarioActual();
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.carritoSubscription = this.bd.fetchCarrito().subscribe(res => {
          this.productosCarrito = res;
          this.calcularTotales();
        });
      }
    });
    this.convertirMoneda();
  }

  ngOnDestroy() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    this.obtenerUsuarioActual();
    this.storage.getItem('usuario_id').then(data=> {
      this.usuarioId = data;
      return this.bd.miPerfil(this.usuarioId);
    }).then(data => {
      if (data) {
        this.usuarioId = data.usuario_id;
        this.cargarCarrito();
      }
    });
  }

  convertirMoneda() {
    if (!this.MonedaDefecto) {
      this.mostrarAlerta('Error', 'Debe seleccionar una moneda para la conversión');
    } else {
      this.apiService.obtenerValorMoneda(this.MonedaBase).subscribe(
        (data) => {
          const tasaConversion = data.rates[this.MonedaDefecto];
          if (tasaConversion) {
            this.TazaConversion = tasaConversion;
            this.TotalConvertido = this.precioTotal * this.TazaConversion;
          } else {
            this.mostrarAlerta('Error', `No se pudo obtener la tasa de conversión para ${this.MonedaDefecto}`);
          }
        },
        (error) => {
          console.error("Error al obtener tasas de cambio:", JSON.stringify(error));
          this.mostrarAlerta('Error', 'Hubo un problema al obtener las tasas de cambio');
        }
      );
    }
  }

  async obtenerUsuarioActual() {
    try {
      const usuario = await this.bd.obtenerUsuarioActual();
      if (usuario) {
        this.usuarioId = usuario.usuario_id;
        this.cargarCarrito();
      } else {
        console.log('No se encontró el usuario actual');
      }
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }

  cargarCarrito() {
    if (this.usuarioId !== null) {
      this.bd.getProductosCarrito(this.usuarioId).then((productos: any[]) => {
        this.productosCarrito = productos;
        this.calcularTotales();
      }).catch(error => {
        console.error('Error al cargar carrito', error);
        this.mostrarAlerta('Error', 'Hubo un problema al cargar tu carrito. Por favor, inténtalo de nuevo.');
      });
    }
  }

  calcularTotales() {
    this.subtotal = this.productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    this.precioTotal = this.subtotal;
    this.TotalConvertido = this.precioTotal * this.TazaConversion;
  }

  eliminarProducto(productoId: number) {
    if (this.usuarioId !== null) {
      this.bd.eliminarProductoDelCarrito(productoId)
        .then(() => this.cargarCarrito())
        .catch(error => {
          console.error('Error al eliminar el producto', error);
          this.mostrarAlerta('Error', 'Hubo un problema al eliminar el producto. Intenta nuevamente.');
        });
    }
  }

  vaciarCarrito(usuarioId: number) {
    if (this.usuarioId !== null) {
      this.bd.vaciarCarrito(usuarioId).catch(error => {
        console.error('Error al vaciar el carrito', error);
        this.mostrarAlerta('Error', 'Hubo un problema al vaciar el carrito. Intenta nuevamente.');
      });
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

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