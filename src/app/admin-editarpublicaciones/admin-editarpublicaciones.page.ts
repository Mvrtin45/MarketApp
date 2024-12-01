import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-editarpublicaciones',
  templateUrl: './admin-editarpublicaciones.page.html',
  styleUrls: ['./admin-editarpublicaciones.page.scss'],
})
export class AdminEditarpublicacionesPage implements OnInit {
  formularioEditar: FormGroup;
  publicacion: any = {};
  fotoPreview: string = ""; // Para mostrar la vista previa de la imagen

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.formularioEditar = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required],
      talla: ['', Validators.required],
      color: ['', Validators.required],
      foto_publicacion: ['', Validators.required]
    });

    this.activatedRouter.params.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
        this.fotoPreview = this.publicacion.foto_publicacion; // Carga la imagen actual
      }
    });
  }

  ngOnInit() {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formularioEditar.patchValue({ foto_publicacion: file });
      this.formularioEditar.get('foto_publicacion')?.updateValueAndValidity();

      // Generar vista previa de la imagen en formato base64
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result as string; // Vista previa en base64
      };
      reader.readAsDataURL(file);
    }
  }

  modificar() {
    if (this.formularioEditar.valid) {
      // Convertir la imagen a base64 antes de enviarla
      const fotoBase64 = this.fotoPreview;

      this.bd.modificarPublicacion(
        this.publicacion.producto_id,
        this.formularioEditar.value.titulo,
        this.formularioEditar.value.descripcion,
        this.formularioEditar.value.talla,
        this.formularioEditar.value.ubicacion,
        this.formularioEditar.value.color,
        this.formularioEditar.value.precio,
        fotoBase64 // Enviar imagen en base64
      )
      .then(() => {
        this.presentAlert('Éxito', 'Publicación modificada correctamente.');
        this.router.navigate(['/admin-publicaciones']); // Navegamos de vuelta a las publicaciones
      })
      .catch(error => {
        this.presentAlert('Error', 'Error al modificar la publicación: ' + JSON.stringify(error));
      });
    } else {
      this.presentAlert('Formulario inválido', 'Por favor, complete todos los campos correctamente.');
    }
  }

  getErrorMessage(field: string): string {
    const control = this.formularioEditar.get(field);
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}