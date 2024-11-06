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
    // Espera a que la base de datos esté lista antes de cargar los datos del usuario
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.cargarUsuarioActual();
      }
    });
  }

  async cargarUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      console.log('Stored User ID:', storedUserId);
      if (storedUserId) {
        this.bd.fetchUsuarios().subscribe(res => {
          this.usuario = res.find(user => user.usuario_id === storedUserId);
          if (this.usuario) {
            this.nombre = this.usuario.nombre_usu;
            this.email = this.usuario.email_usu;
            this.telefono = this.usuario.telefono_usu;
            if (this.usuario.imagen_usu) {
              this.photoUrl = this.usuario.imagen_usu;
            }
          } else {
            this.presentAlert("ERROR", "No se pudieron obtener los datos del usuario.");
          }
        });
      } else {
        this.presentAlert("ERROR", "No se pudo obtener el ID del usuario.");
      }
    } catch (error) {
      this.presentAlert("ERROR", "Error al cargar los datos del usuario.");
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

      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imagePath);
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      await this.presentAlert("Error", "No se pudo actualizar la imagen.");
    }
  }

  async selectImage() {
    try {
      const imagePath = await this.camaraService.pickImage();
      this.photoUrl = imagePath;

      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imagePath);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      await this.presentAlert("ERROR", 'Error al seleccionar la imagen.');
    }
  }

  async deletePhoto() {
    this.photoUrl = '/assets/icon/logo.jpg';
    if (this.usuario && this.usuario.usuario_id) {
      await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, null);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}