import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-admin-filtrarpubli',
  templateUrl: './admin-filtrarpubli.page.html',
  styleUrls: ['./admin-filtrarpubli.page.scss'],
})
export class AdminFiltrarpubliPage implements OnInit {
  publicacionesPorUsuario: any[] = [];

  constructor(private router: Router, private bd: ServicebdService) { 
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchPublicacionesConUsuarios().subscribe(res => {
          this.publicacionesPorUsuario = this.agruparPublicacionesPorUsuario(res);
        });
      }
    });
  }

  ngOnInit() {}

  // Método para agrupar las publicaciones por usuario
  agruparPublicacionesPorUsuario(publicaciones: any[]): any[] {
    const usuariosMap = new Map();

    publicaciones.forEach(publi => {
      if (!usuariosMap.has(publi.usuario_id)) {
        usuariosMap.set(publi.usuario_id, {
          usuario_id: publi.usuario_id,
          nombre_usu: publi.nombre_usu,
          email_usu: publi.email_usu,
          publicaciones: []
        });
      }

      usuariosMap.get(publi.usuario_id).publicaciones.push({
        producto_id: publi.producto_id,
        titulo: publi.titulo,
        descripcion: publi.descripcion,
        talla: publi.talla,
        ubicacion: publi.ubicacion,
        color: publi.color,
        precio: publi.precio,
        foto_publicacion: publi.foto_publicacion
      });
    });

    return Array.from(usuariosMap.values());
  }
}
