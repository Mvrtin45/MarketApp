import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  publicaciones: any[] = [];

  constructor(
    private bd: ServicebdService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.bd.seleccionarPublicaciones().then(() => {
      this.bd.listadoPublicaciones.subscribe(data => {
        this.publicaciones = data;
      });
    });
  }

  detalle_publicacion(publicacionId: number) {
    this.router.navigate(['/detalle-publicacion',publicacionId]);
  }
}