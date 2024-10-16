import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-subirpubli',
  templateUrl: './subirpubli.page.html',
  styleUrls: ['./subirpubli.page.scss'],
})
export class SubirpubliPage implements OnInit {
  formularioPublicacion: FormGroup;
  titulo: string = "";
  descripcion: string = "";
  precio!: number;
  ubicacion: string = "";
  talla: string = "";
  color: string = "";

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private bd: ServicebdService
  ) {
    this.formularioPublicacion = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(1)]], 
      ubicacion: ['', Validators.required],
      talla: ['', Validators.required],
      color: ['', Validators.required],
      image: [null, Validators.required] // Cambia el tipo de imagen a File
    });
  }

  ngOnInit() {}

  // Envío del formulario
  async subirPublicacion() {
    if (this.formularioPublicacion.valid) {
      const nuevaPublicacion = {
        titulo: this.formularioPublicacion.get('titulo')!.value,
        descripcion: this.formularioPublicacion.get('descripcion')!.value,
        talla: this.formularioPublicacion.get('talla')!.value,
        ubicacion: this.formularioPublicacion.get('ubicacion')!.value,
        color: this.formularioPublicacion.get('color')!.value,
        precio: this.formularioPublicacion.get('precio')!.value
      };

      // Guardar en la base de datos SQLite
      this.bd.insertarPublicacion(
        nuevaPublicacion.titulo,
        nuevaPublicacion.descripcion,
        nuevaPublicacion.talla,
        nuevaPublicacion.ubicacion,
        nuevaPublicacion.color,
        nuevaPublicacion.precio
      ).then(async () => {

        // Mostrar alerta de éxito
        const alert = await this.alertController.create({
          header: 'Publicación exitosa',
          message: 'Tu publicación ha sido subida con éxito.',
          buttons: ['OK']
        });

        await alert.present();
        alert.onDidDismiss().then(() => {
          this.router.navigate(['/tabs/perfil']);
        });
      }).catch(async (error) => {
        // Mostrar alerta de error en caso de que falle la inserción
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo subir la publicación. Por favor, inténtalo de nuevo.',
          buttons: ['OK']
        });

        await alert.present();
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario inválido',
        message: 'Por favor, revise los campos y corrija los errores.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para mostrar mensajes de error
  getErrorMessage(field: string): string {
    const control = this.formularioPublicacion.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength')?.requiredLength;
      return `El máximo de caracteres es ${maxLength}`;
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }
    return '';
  }
}