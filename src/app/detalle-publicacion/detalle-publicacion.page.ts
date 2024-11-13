import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage implements OnInit {
  publicacion: any;

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const publicacionId = idParam ? +idParam : 0; 
    this.cargarPublicacion(publicacionId);
  }

  cargarPublicacion(id: number) {
    this.bd.getPublicacionById(id).then(data => {
      this.publicacion = data;
    });
  }
}