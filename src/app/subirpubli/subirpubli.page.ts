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
  imagen: string = "";
  selectedFile: File | null = null;

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

  // Método para manejar la selección del archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', this.selectedFile); // Depuración
    } else {
      this.selectedFile = null;
      console.log('No se seleccionó ningún archivo'); // Depuración
    }
  }

  // Envío del formulario
  async subirPublicacion() {
    if (this.formularioPublicacion.valid) {
  
      const nuevaPublicacion = {
        titulo: this.formularioPublicacion.get('titulo')?.value,
        descripcion: this.formularioPublicacion.get('descripcion')?.value,
        talla: this.formularioPublicacion.get('talla')?.value,
        ubicacion: this.formularioPublicacion.get('ubicacion')?.value,
        color: this.formularioPublicacion.get('color')?.value,
        precio: this.formularioPublicacion.get('precio')?.value,
        imagen: this.selectedFile, // Cambiar a this.selectedFile
      };
  
      if (this.selectedFile) { // Asegúrate de que hay un archivo seleccionado
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Image = reader.result as string;
  
          // Guardar en la base de datos SQLite
          this.bd.insertarPublicacion(
            nuevaPublicacion.titulo,
            nuevaPublicacion.descripcion,
            nuevaPublicacion.talla,
            nuevaPublicacion.ubicacion,
            nuevaPublicacion.color,
            nuevaPublicacion.precio,
            base64Image,
          ).then(async () => {
            // Mostrar alerta de éxito
            const alert = await this.alertController.create({
              header: 'Publicación exitosa',
              message: 'Tu publicación ha sido subida con éxito.',
              buttons: ['OK']
            });
            await alert.present();
            alert.onDidDismiss().then(() => {
              this.router.navigate(['/admin-publicaciones']);
            });
          }).catch(async (error) => {
            await this.mostrarAlerta('Error', 'No se pudo subir la publicación. Por favor, inténtalo de nuevo.');
          });
        };
        reader.readAsDataURL(this.selectedFile); // Leer el archivo como base64
      } else {
        await this.mostrarAlerta('Error', 'Por favor, selecciona una imagen.');
      }
    } else {
      await this.mostrarAlerta('Formulario inválido.', 'Por favor, revise los campos y corrija los errores.');
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

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}