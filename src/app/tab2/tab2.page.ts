import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Definir la interfaz para el producto
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number; // Campo para la cantidad
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private alertController: AlertController) {}

  async showAddAlert(producto: Producto) {  // Especificar el tipo del parámetro
    // Obtener el carrito del LocalStorage, o inicializar uno vacío si no existe
    let carrito: Producto[] = JSON.parse(localStorage.getItem('productos_carrito') || '[]');

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        productoExistente.cantidad += producto.cantidad;
    } else {
        // Si no existe, agregar el producto al carrito
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en el LocalStorage
    localStorage.setItem('productos_carrito', JSON.stringify(carrito));

    // Mostrar la alerta de que el producto ha sido agregado
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: `El producto ${producto.nombre} ha sido agregado al carrito de compra por $${producto.precio}.`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Ejemplo de función que puedes llamar para agregar un producto
  agregarProductoAlCarrito() {
    const nuevoProducto: Producto = {
      id: 1, // ID del producto
      nombre: 'Camisa de Algodón',
      precio: 25.99,
      cantidad: 1 // Cantidad a agregar
    };

    // Llamar al método para agregar el producto al carrito y mostrar la alerta
    this.showAddAlert(nuevoProducto);
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