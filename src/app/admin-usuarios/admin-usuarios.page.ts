import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(private router: Router, private bd: ServicebdService) {
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
    const action = usuario.is_banned ? 'restaurar' : 'banear'; // Si ya está baneado, restauramos
    const actionText = action === 'banear' ? '¿Estás seguro de que deseas banear a este usuario?' : '¿Estás seguro de que deseas restaurar a este usuario?';
  
    this.alertController.create({
      header: action === 'banear' ? 'Banear Usuario' : 'Restaurar Usuario',
      message: actionText,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: action === 'banear' ? 'Banear' : 'Restaurar',
          handler: () => {
            if (action === 'banear') {
              this.bd.banearUsuario(usuario.usuario_id);
            } else {
              this.bd.restaurarUsuario(usuario.usuario_id);
            }
            // Actualizar la lista de usuarios después de banear/restaurar
            this.usuarios = this.usuarios.filter(u => u.usuario_id !== usuario.usuario_id);
          }
        }
      ]
    }).then(alert => alert.present());
  }
  
}
