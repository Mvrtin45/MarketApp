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
    };
    this.router.navigate(['/modificar'], navigationsExtras);
  }

  eliminar(usuario: any) {
    this.bd.eliminarUsuario(usuario.usuario_id); 
  }

  agregar() {
    this.router.navigate(['/agregar-usuario']); 
  }

}
