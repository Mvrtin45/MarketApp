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
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.cargarUsuarioActual();
      }
    });
  }

  async cargarUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      if (storedUserId) {
        this.bd.fetchUsuarios().subscribe(async res => {
          this.usuario = res.find(user => user.usuario_id === storedUserId);
          if (this.usuario) {
            this.nombre = this.usuario.nombre_usu;
            this.email = this.usuario.email_usu;
            this.telefono = this.usuario.telefono_usu;

            // Cargar la imagen del perfil desde BLOB
            if (this.usuario.imagen_usu) {
              const blob = this.usuario.imagen_usu as Blob;
              this.photoUrl = URL.createObjectURL(blob);
            } else {
              this.photoUrl = '/assets/icon/logo.jpg';
            }
          } else {
            this.presentAlert("Error", "No se pudieron obtener los datos del usuario.");
          }
        }, error => {
          this.presentAlert("Error", `Error al recuperar datos del usuario: ${JSON.stringify(error)}`);
        });
      } else {
        this.presentAlert("Error", "No se pudo obtener el ID del usuario desde el almacenamiento.");
      }
    } catch (error) {
      this.presentAlert("Error", `Error al cargar los datos del usuario: ${JSON.stringify(error)}`);
    }
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
      const blob = await this.convertToBlob(imagePath);
      const imageUrl = URL.createObjectURL(blob);  // Crear URL de la imagen como string
  
      this.photoUrl = imageUrl; // Asignar la URL generada a la propiedad photoUrl
  
      if (this.usuario && this.usuario.usuario_id) {
        // Pasar la URL generada como string
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imageUrl); 
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      await this.presentAlert("Error", "No se pudo tomar la foto.");
    }
  }

  async selectImage() {
    try {
      const imagePath = await this.camaraService.pickImage();
      const blob = await this.convertToBlob(imagePath);
      const imageUrl = URL.createObjectURL(blob);  // Crear URL de la imagen como string
  
      this.photoUrl = imageUrl; // Asignar la URL generada a la propiedad photoUrl
  
      if (this.usuario && this.usuario.usuario_id) {
        // Pasar la URL generada como string
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, imageUrl); 
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      await this.presentAlert("Error", "Error al seleccionar la imagen.");
    }
  }

  async deletePhoto() {
    this.photoUrl = '/assets/icon/logo.jpg'; // Imagen por defecto si se elimina la foto
    if (this.usuario && this.usuario.usuario_id) {
      // Pasar una cadena vacía "" para indicar que no hay imagen
      await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, ''); 
    }
  }

  async logout() {
    await this.storage.clear();
    this.router.navigate(['/login']);
  }

  async convertToBlob(imagePath: string): Promise<Blob> {
    const response = await fetch(imagePath);
    return await response.blob();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}