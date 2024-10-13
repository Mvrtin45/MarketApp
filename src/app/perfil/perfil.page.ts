import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  menuOpen: boolean = false;
  correo: string = "";
  telefono!: number;
  nombre: string = ""; 
  userDetails: any = {}; // Datos del usuario para mostrar en el perfil
  mensaje: string = ""; // Variable para mostrar mensajes de error o información
  publicaciones: any[] = []; // Publicaciones para mostrar en el perfil

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private storage: NativeStorage, 
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUserDetails();
    this.cargarPublicaciones();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  async cargarUserDetails(){
    try {
      const data = await this.storage.getItem('userDetails');
      this.userDetails = data;
      this.mensaje = ''; // Limpiar mensaje si se cargan los datos correctamente
    } catch (error) {
      this.mensaje = 'No se pudieron obtener los detalles del usuario.'; // Mostrar mensaje de error
    }
  }

  cargarPublicaciones() {
    const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    this.publicaciones = publicacionesGuardadas;
  }

  borrarpubli(){
    localStorage.removeItem('publicaciones');
  }
  logout() {
    this.router.navigate(['/login']);
  }
}

