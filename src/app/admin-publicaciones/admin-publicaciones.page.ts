import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-publicaciones',
  templateUrl: './admin-publicaciones.page.html',
  styleUrls: ['./admin-publicaciones.page.scss'],
})
export class AdminPublicacionesPage implements OnInit {

  publicaciones: any = [
    {
      producto_id: '',
      titulo: '',
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
    this.bd.dbState().subscribe(data=>{
    //validar si la bd esta lista
    if(data){
      //subscribir al observable de la listaNoticias
      this.bd.fetchPublicaciones().subscribe(res=>{
        this.publicaciones = res;
      })
    }
  })
  }

  modificar(publicacion: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        publicacion: publicacion
      }
    };
    this.router.navigate(['/admin-editarpublicaciones'], navigationsExtras);
  }

  eliminar(publicacion: any) {
    this.bd.eliminarPublicacion(publicacion.producto_id);
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }
}
