import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ServicebdService } from '../services/servicebd.service';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  productos: any[] = [];
  nombre: string = "";
  descripcion: string = "";
  talla: string = "";
  ubicacion: string = "";
  color: string = "";
  precio!: number;
 
  constructor(private itemService: ItemService,
    private bd: ServicebdService
  ) {}
 
  ngOnInit() {
  }
 
  loadProductos() {
    this.itemService.getItems().subscribe(
      data => {
        this.productos = data;
        if (this.productos.length > 0) {
          alert('Productos cargados correctamente: ' + this.productos.length + ' productos encontrados');
        } else {
          alert('No se encontraron productos.');
        }
      },
      error => {
        alert('Error al cargar productos: ' + error.message);
      }
    );
  }
 
  addProducto() {
    this.bd.insertarProducto(this.nombre, this.descripcion, this.talla, this.ubicacion, this.color, this.precio);
  }
 
  updateProducto(producto: { producto_id: number; }) {
    const updatedProducto = { 
      ...producto, 
      nombre: 'Producto Actualizado' 
    };
    this.itemService.updateItem(producto.producto_id, updatedProducto).subscribe(() => {
      this.loadProductos();
    });
  }
 
  deleteProducto(producto: { producto_id: number; }) {
    this.itemService.deleteItem(producto.producto_id).subscribe(() => {
      this.loadProductos();
    });
  }
}
