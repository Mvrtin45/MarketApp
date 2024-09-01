import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  profileIdToDelete: string = '';
  postIdToDelete: string = '';
  contentIdToRestrict: string = '';

  constructor() { }

  ngOnInit() {
  }

  deleteProfile() {
    console.log(`Eliminar perfil con ID: ${this.profileIdToDelete}`);
   
  }

  deletePost() {
    console.log(`Eliminar publicación con ID: ${this.postIdToDelete}`);
   
  }

  restrictContent() {
    console.log(`Restringir contenido con ID: ${this.contentIdToRestrict}`);
   
  }

  viewUsers() {
    console.log('Ver todos los usuarios');
    
  }

  viewPosts() {
    console.log('Ver todas las publicaciones');
    
  }

  viewReports() {
    console.log('Ver reportes');
    
  }

  openSettings() {
    console.log('Abrir configuración');
    
  }

  viewStatistics() {
    console.log('Ver estadísticas');
    
  }
}
