import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  correo: string = "";
  telefono!: number;
  nombre: string = ""; 
  valor: string = ""; 
  arregloPublicacion: any = [
    {
      id: '',
      titulo: '',
      precio: '',
      descripcion: '',
      ubicacion: '',
      talla: '',
      color: '',
    }
  ]


  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
    private storage: NativeStorage, private alertController: AlertController) {
    }

  ngOnInit() {
  }

  crear(){
    this.storage.setItem(this.nombre, this.valor);
    this.presentAlert("Variable Storage Creada");
  }

  async consultarUserDetails(){
    try {
      const data = await this.storage.getItem('userDetails');
      // Mostrar los detalles del usuario en una alerta
      const alert = await this.alertController.create({
        header: 'Detalles del Usuario',
        message: `Nombre: ${data.nombre}<br>Correo: ${data.correo}<br>Teléfono: ${data.telefono}`,
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Mostrar alerta en caso de error al obtener los datos
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudieron obtener los detalles del usuario.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
