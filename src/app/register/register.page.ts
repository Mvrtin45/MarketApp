import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioRegistro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  async registrar() {
    if (this.formularioRegistro.valid) {
      const userData = {
        email: this.formularioRegistro.get('email')?.value,
        name: this.formularioRegistro.get('name')?.value,
        phone: this.formularioRegistro.get('phone')?.value
      };

      // Guardar datos en el almacenamiento local
      localStorage.setItem('userData', JSON.stringify(userData));

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Registro exitoso. Redirigiendo al login...',
        buttons: ['OK']
      });

      await alert.present();

      
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
