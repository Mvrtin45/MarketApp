import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  // Indicador para saber si la compra fue exitosa
  compraExitosa: boolean = false;

  // Datos del producto (se simulan en este ejemplo)
  producto = {
    nombre: 'Camiseta Deportiva',
    precio: 25990,  // Asegúrate de que sea un número en formato numérico
    cantidad: 2,
    total: 51980   // Producto * cantidad, se debe reflejar correctamente
  };

  fechaCompra = new Date();

  constructor() { }

  ngOnInit() {
    // Simulamos una respuesta de compra exitosa después de un tiempo
    setTimeout(() => {
      this.compraExitosa = true; // Cambiar a false para probar el error
    }, 3000); // Esperamos 3 segundos para simular el proceso de compra
  }

  // Método para volver al inicio
  volverAlInicio() {
    console.log("Volviendo al inicio...");
    // Lógica para redirigir al inicio o página deseada
  }
}