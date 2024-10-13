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
      price: ['', [Validators.required, Validators.min(1)]], 
      location: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      image: [null, Validators.required] // Cambia el tipo de imagen a File
    });
  }

  ngOnInit() {}

  // Envío del formulario
  async subirPublicacion() {
    if (this.formularioPublicacion.valid) {
      const nuevaPublicacion = {
        title: this.formularioPublicacion.get('title')!.value,
        description: this.formularioPublicacion.get('description')!.value,
        price: this.formularioPublicacion.get('price')!.value,
        location: this.formularioPublicacion.get('location')!.value,
        size: this.formularioPublicacion.get('size')!.value,
        color: this.formularioPublicacion.get('color')!.value,
        image: this.formularioPublicacion.get('image')!.value,
      };

      // Guardar en local storage
      let publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
      publicaciones.push(nuevaPublicacion);
      localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Publicación exitosa',
        message: 'Tu publicación ha sido subida con éxito.',
        buttons: ['OK']
      });
      
      await alert.present();
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/tabs/tab1']);
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