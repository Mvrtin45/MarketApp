import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  menuOpen: boolean = false;
  usuario: any; 
  nombre: string = '';
  email: string = '';
  telefono: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private storage: NativeStorage, 
    private alertController: AlertController,
    private bd: ServicebdService,
  ) {}

  ngOnInit() {
    this.cargarUsuarioActual();
    this.bd.seleccionarUsuarios();
  }

  async cargarUsuarioActual() {
    try {
      // Obtener el ID del usuario almacenado
      const storedUserId = await this.storage.getItem('usuario_id'); 
  
      if (storedUserId) {
        // Obtener los datos del usuario directamente desde la base de datos utilizando el ID
        const usuarioActual = await this.bd.obtenerDatosUsuario(storedUserId);
  
        if (usuarioActual) {
          this.usuario = usuarioActual; // Guarda todo el objeto para un acceso más sencillo
          this.nombre = usuarioActual.nombre_usu; 
          this.email = usuarioActual.email_usu; 
          this.telefono = usuarioActual.telefono_usu;
          this.bd.seleccionarUsuarios();
        } else {
          // Mostrar alerta si no se encuentran los datos del usuario
          await this.mostrarAlerta("No se pudieron obtener los datos del usuario.");
        }
      } else {
        // Mostrar alerta si no se encuentra el ID en el almacenamiento
        await this.mostrarAlerta("No se pudo obtener el ID del usuario.");
      }
    } catch (error) {
      // Manejar errores con una alerta
      await this.mostrarAlerta( "Error al cargar los datos del usuario.");
    }
  }

  modificar() {
    this.router.navigate(['/editar-perfil']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}