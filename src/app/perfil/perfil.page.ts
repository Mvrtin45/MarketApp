import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { CamaraService } from '../services/camara.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  menuOpen: boolean = false;
  usuario: any;
  email: string = '';
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  photoUrl: string = '/assets/icon/logo.jpg'; // Imagen por defecto
  imagen: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: NativeStorage,
    private alertController: AlertController,
    private camaraService: CamaraService,
    private actionSheetController: ActionSheetController,
    private bd: ServicebdService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarUsuarioActual();
  }

  async recargarDatos() {
    await this.cargarUsuarioActual();
  }

  async cargarUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      console.log('Stored User ID:', storedUserId);
      if (storedUserId) {
        const usuarioActual = await this.bd.obtenerDatosUsuario(storedUserId);
        if (usuarioActual) {
          this.usuario = usuarioActual; // Guarda todo el objeto para un acceso más sencillo
          this.nombre = usuarioActual.nombre_usu;
          this.email = usuarioActual.email_usu;
          this.telefono = usuarioActual.telefono_usu;

          // Verifica que la propiedad 'imagen_usu' existe antes de asignarla
          if (usuarioActual.imagen_usu) {
            this.photoUrl = usuarioActual.imagen_usu;
          }
        } else {
          await this.presentAlert("ERROR","No se pudieron obtener los datos del usuario.");
        }
      } else {
        await this.presentAlert("ERROR","No se pudo obtener el ID del usuario.");
      }
    } catch (error) {
      await this.presentAlert("ERROR","Error al cargar los datos del usuario.");
    }
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  modificar() {
    this.router.navigate(['/editar-perfil']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async selectImageOrTakePhoto() {
    const action = await this.showActionSheet();
    if (action === 'camera') {
      this.takePhoto();
    } else if (action === 'gallery') {
      this.selectImage();
    } else if (action === 'delete') {
      this.deletePhoto();
    }
  }

  async showActionSheet() {
    let selectedAction = '';

    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            selectedAction = 'camera';
            return true;
          },
        },
        {
          text: 'Elegir de la Galería',
          handler: () => {
            selectedAction = 'gallery';
            return true;
          },
        },
        {
          text: 'Eliminar Foto',
          handler: () => {
            selectedAction = 'delete';
            return true;
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();
    return selectedAction;
  }

  async takePhoto() {
    try {
      const imagePath = await this.camaraService.takePhoto();
      this.photoUrl = imagePath;

      console.log('Usuario ID antes de la actualización:', this.usuario?.usuario_id); // Loguea el ID del usuario

      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imagePath);
        await this.presentAlert("Actualización", "Imagen actualizada exitosamente.");
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      await this.presentAlert("Error", "No se pudo actualizar la imagen.");
    }
  }

  async selectImage() {
    try {
      const imagePath = await this.camaraService.pickImage();  // Seleccionar imagen
      this.photoUrl = imagePath;  // Asignar la nueva ruta de la imagen

      console.log('Usuario ID antes de la actualización al seleccionar imagen:', this.usuario?.usuario_id); // Log para depurar

      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imagePath);
        await this.presentAlert("Actualización", "Imagen actualizada exitosamente.");
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      await this.presentAlert("ERROR", 'Error al seleccionar la imagen.');
    }
  }

  async deletePhoto() {
    this.photoUrl = '/assets/icon/logo.jpg'; // Restablecer a la imagen por defecto
    if (this.usuario && this.usuario.usuario_id) {
      await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, null);  // Borrar la imagen de la BD
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}