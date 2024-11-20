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
  compras: any[] = []; 
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
        this.cargarCompras();
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
    
            // Asigna el valor de la imagen desde base64 directamente a `photoUrl`
            this.photoUrl = this.usuario.imagen_usu || '/assets/icon/logo.jpg';
          } else {
            alert("No se pudieron obtener los datos del usuario.");
          }
        }, error => {
          alert("Error al recuperar datos del usuario: " + JSON.stringify(error));
        });
      } else {
        alert("No se pudo obtener el ID del usuario desde el almacenamiento.");
      }
    } catch (error) {
    }
  }

  async cargarCompras() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      if (storedUserId) {
        this.bd.ObtenerComprasUsuario(storedUserId).then(compras => {
          this.compras = compras;
        }).catch(error => {
          alert("Error al recuperar las compras: " + JSON.stringify(error));
        });
      }
    } catch (error) {
      alert("Error al obtener el ID del usuario desde el almacenamiento.");
    }
  }

  modificar() {
    this.router.navigate(['/editar-perfil']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  modificarContrasena() {
    this.router.navigate(['/modificarcontrasena'], {
      queryParams: { email: this.email }  // Enviamos el correo electrónico como parámetro
    });
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
      const base64Image = await this.bd.convertirBlobABase64(blob); // Convierte a base64
      this.photoUrl = base64Image; // Muestra la imagen en la interfaz
  
      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, base64Image); // Guarda en la base de datos
      }
    } catch (error) {
      alert("No se pudo tomar la foto.");
    }
  }

  async selectImage() {
    try {
      const imagePath = await this.camaraService.pickImage();
      const blob = await this.convertToBlob(imagePath);
      const base64Image = await this.bd.convertirBlobABase64(blob); // Convierte a base64
      this.photoUrl = base64Image; // Muestra la imagen en la interfaz
  
      if (this.usuario && this.usuario.usuario_id) {
        await this.bd.actualizarImagenUsuario(this.usuario.usuario_id, base64Image); // Guarda en la base de datos
      }
    } catch (error) {
      alert("Error al seleccionar la imagen.");
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
    try {
      const response = await fetch(imagePath);
      if (!response.ok) throw new Error("Error al convertir a Blob");
      return await response.blob();
    } catch (error) {
      console.error("Error en convertToBlob:", error);
      throw error;
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
}