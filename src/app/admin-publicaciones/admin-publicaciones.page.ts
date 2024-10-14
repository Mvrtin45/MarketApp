import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-publicaciones',
  templateUrl: './admin-publicaciones.page.html',
  styleUrls: ['./admin-publicaciones.page.scss'],
})
export class AdminPublicacionesPage implements OnInit {
  arregloPublicaciones: any [] = [];
  
  constructor() { }

  ngOnInit() {
  }

  modificar(publicacion: any) {
    // Implementa la lógica para modificar la publicación
    console.log("Modificar publicación:", publicacion);
  }
 
  eliminar(publicacion: any) {
    // Implementa la lógica para eliminar la publicación
    console.log("Eliminar publicación:", publicacion);
  }
  
  agregar(publicacion: any) {
    // Implementa la lógica para agregar la publicación
    console.log("Agregar publicación:", publicacion);
  }
}
