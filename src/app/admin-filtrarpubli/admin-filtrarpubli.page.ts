import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { Publicaciones } from '../services/publicaciones';

@Component({
  selector: 'app-admin-filtrarpubli',
  templateUrl: './admin-filtrarpubli.page.html',
  styleUrls: ['./admin-filtrarpubli.page.scss'],
})
export class AdminFiltrarpubliPage implements OnInit {
  publicacionesPorUsuario: { usuario_id: number; nombre_usu: string; email_usu: string; publicaciones: Publicaciones[] }[] = [];

  constructor(private router: Router, private bd: ServicebdService) { 
    this.bd.fetchPublicacionesConUsuarios().subscribe(res => {
      console.log('Datos recibidos:', res); // Verifica lo que estás recibiendo aquí
      this.publicacionesPorUsuario = this.agruparPublicacionesPorUsuario(res);
      console.log('Datos agrupados:', this.publicacionesPorUsuario); // Verifica los datos agrupados
    });
  }

  ngOnInit() {}

  // Método para agrupar las publicaciones por usuario
  agruparPublicacionesPorUsuario(publicaciones: any[]): any[] {
    const usuariosMap = new Map();

    publicaciones.forEach(publi => {
        // Solo agregar si el usuario tiene publicaciones válidas
        if (publi.producto_id !== null) {
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
        }
    });
    return Array.from(usuariosMap.values());
  } 
}
