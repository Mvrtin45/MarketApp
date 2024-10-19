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
  }

  async cargarUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id'); 
      if (storedUserId) {
        const usuarioActual = await this.bd.obtenerDatosUsuario(storedUserId);
        if (usuarioActual) {
          this.usuario = usuarioActual;
          this.nombre = usuarioActual.nombre_usu;
          this.email = usuarioActual.email_usu;
          this.telefono = usuarioActual.telefono_usu;
        } else {
          this.mostrarAlerta('No se pudo obtener los datos del usuario. EN EL TS PERFIL');
        }
      } else {
        this.mostrarAlerta('No se pudo obtener el ID del usuario.');
      }
    } catch (error) {
      this.mostrarAlerta('Error al cargar los datos del usuario.');
    }
  }

  modificar(usuario: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    }
    this.router.navigate(['/editar-perfil'], navigationsExtras);
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