import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-publicaciones',
  templateUrl: './admin-publicaciones.page.html',
  styleUrls: ['./admin-publicaciones.page.scss'],
})
export class AdminPublicacionesPage implements OnInit {

  productos: any = [
    {
      producto_id: '',
      nombre: '',
      descripcion: '',
      talla: '',
      ubicacion: '',
      color: '',
      precio: ''
    }
  ];
  
  constructor(
    private bd: ServicebdService, 
    private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // Validar si la BD está lista
      if (data) {
        // Subscribir al observable de la lista de productos
        this.bd.fetchProductos().subscribe(res => {
          this.productos = res;
        });
      }
    });
  }

  modificar(producto: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        producto: producto
      }
    };
    this.router.navigate(['/admin-usuarios'], navigationsExtras);
  }

  eliminar(producto: any) {
    this.bd.eliminarProducto(producto.producto_id);
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }
}
