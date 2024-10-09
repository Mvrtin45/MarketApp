import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subirpubli',
  templateUrl: './subirpubli.page.html',
  styleUrls: ['./subirpubli.page.scss'],
})
export class SubirpubliPage implements OnInit {
  formularioPublicacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.formularioPublicacion = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(1)]], // Precio mínimo de 1 CLP
      location: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      image: [null, Validators.required] // Imagen obligatoria
    });
  }

  ngOnInit() {}

  // Envío del formulario
  async subirPublicacion() {
    if (this.formularioPublicacion.valid) {
      const formData = new FormData();

      // Añadimos los datos del formulario al formData
      formData.append('title', this.formularioPublicacion.get('title')!.value);
      formData.append('description', this.formularioPublicacion.get('description')!.value);
      formData.append('price', this.formularioPublicacion.get('price')!.value);
      formData.append('location', this.formularioPublicacion.get('location')!.value);
      formData.append('size', this.formularioPublicacion.get('size')!.value);
      formData.append('color', this.formularioPublicacion.get('color')!.value);
      formData.append('image', this.formularioPublicacion.get('image')!.value);

      // Simulación de subida exitosa
      const alert = await this.alertController.create({
        header: 'Publicación exitosa',
        buttons: ['OK']
      });
      
      await alert.present();
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/tabs/perfil']);
      });
    } else {
      // Mostrar alerta si el formulario es inválido
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