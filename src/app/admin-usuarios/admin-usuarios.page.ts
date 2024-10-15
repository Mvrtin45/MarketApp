import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {
  
  publicacion: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    });
  }

  ngOnInit() {
  }

  modificar() {
    this.bd.modificarPublicacion(
      this.publicacion.producto_id,
      this.publicacion.nombre,
      this.publicacion.descripcion,
      this.publicacion.talla,
      this.publicacion.ubicacion,
      this.publicacion.color,
      this.publicacion.precio
    );
  }
}
