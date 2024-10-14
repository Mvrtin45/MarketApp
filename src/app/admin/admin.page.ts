import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  productos: any[] = [];
 
  constructor(private itemService: ItemService) {}
 
  ngOnInit() {
    this.loadProductos();
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
    const newProducto = {
      nombre: 'Nuevo Producto',
      descripcion: 'Descripción del producto',
      talla: 'M',
      ubicacion: 'Almacén 1',
      color: 'Rojo',
      precio: 100,
      categoria_id: 1 // Ajusta el ID a una categoría válida
    };
    this.itemService.addItem(newProducto).subscribe(() => {
      this.loadProductos();
    });
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
