import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  usuario_id!: number;

  constructor(
    private router: Router, 
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {}

  async ngOnInit() {
    // Obtener `usuario_id` del usuario actual y cargar favoritos
    await this.obtenerUsuarioId();
    if (this.usuario_id) {
      this.loadFavorites();
    }
  }

  // Obtener el ID del usuario desde el almacenamiento
  async obtenerUsuarioId() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      console.log('ID de usuario almacenado:', storedUserId);
      console.log('ID de usuario almacenado:', this.usuario_id);
      this.usuario_id = storedUserId;
    } catch (e) {
      console.error('Error al obtener el ID de usuario:', e);
    }
  }

  // Cargar los productos favoritos del usuario actual
  loadFavorites() {
    this.bd.loadFavorites(this.usuario_id).then(favoritos => {
      this.favoritos = favoritos;
      console.log('Favoritos cargados:', this.favoritos);
    }).catch(error => {
      console.error('Error al cargar favoritos:', error);
    });
  }
}
