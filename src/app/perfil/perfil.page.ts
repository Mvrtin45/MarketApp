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
  usuario_id: number | null = null; // Asegúrate de que esto sea number
  usuario: any; // Cambia a 'usuario' en lugar de 'Infousuarios'

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private storage: NativeStorage, 
    private alertController: AlertController,
    private bd: ServicebdService,
  ) {}

  ngOnInit() {
    const usuarioId = this.activatedRoute.snapshot.paramMap.get('usuario_id'); 
  this.usuario_id = usuarioId ? parseInt(usuarioId) : null; 
  this.mostrarAlerta('Usuario ID', `ID de usuario: ${this.usuario_id}`); // Agrega esta línea para verificar el ID
  this.obtenerUsuario(this.usuario_id);
  }

  modificar(usuario: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    }
    this.router.navigate(['/editar-perfil'], navigationsExtras);
  }

  async obtenerUsuario(usuario_id: number | null) {
    if (usuario_id) {
      this.mostrarAlerta('Información', `Buscando usuario con ID: ${usuario_id}`); // Agrega esta línea
      const usuario = await this.bd.getUsuarioPorId(usuario_id);
      this.usuario = usuario; 
      if (!this.usuario) {
        this.mostrarAlerta('Error', 'No se encontró el usuario.');
      }
    } else {
      this.mostrarAlerta('Error', 'ID de usuario no válido.');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}