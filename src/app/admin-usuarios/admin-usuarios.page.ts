import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {
  
  usuarios: any = [
    {
      usuario_id: '',
      nombre_usu: '',
      email_usu: '',
      telefono_usu: ''
    }
  ];

  constructor(private router: Router, private bd: ServicebdService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // Validar si la base de datos está lista
      if (data) {
        // Suscribirse al observable de la lista de usuarios
        this.bd.fetchUsuarios().subscribe(res => {
          this.usuarios = res;
        });
      }
    });
  }

  modificar(usuario: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    }
    this.router.navigate(['/admin-editarusuarios'], navigationsExtras);
  }

  eliminar(usuario: any) {
    this.bd.eliminarUsuario(usuario.usuario_id); 
  }

  agregar() {
    this.router.navigate(['/agregar-usuario']); 
  }

  banear(usuario: any) {
    this.bd.banearUsuario(usuario.usuario_id).then(() => {
      this.presentAlert('Éxito', `Usuario ${usuario.usuario_id} baneado correctamente.`);
      usuario.estado = 0; // Actualizar estado en la lista localmente
    }).catch(e => {
      this.presentAlert('Error', `Error al banear el usuario: ${e.message}`);
    });
  }

  restaurar(usuario: any) {
    this.bd.restaurarUsuario(usuario.usuario_id).then(() => {
      this.presentAlert('Éxito', `Usuario ${usuario.usuario_id} restaurado correctamente.`);
      usuario.estado = 1; // Actualizar estado en la lista localmente
    }).catch(e => {
      this.presentAlert('Error', `Error al restaurar el usuario: ${e.message}`);
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
