import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  async ingresar() {
    if (this.formularioLogin.valid) {
      // Obtener los datos del local storage
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        const formEmail = this.formularioLogin.get('email')?.value;
        const formPassword = this.formularioLogin.get('password')?.value;
        
        // Aquí podrías validar el email y la contraseña contra los datos almacenados, si es necesario
        if (formEmail === userData.email) {
          // Mostrar alerta de éxito
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Inicio de sesión exitoso. Redirigiendo al perfil...',
            buttons: ['OK']
          });

          await alert.present();

          // Redirigir al perfil después de que el usuario cierre la alerta
          alert.onDidDismiss().then(() => {
            this.router.navigate(['/perfil']);
          });
        } else {
          console.log('Correo electrónico o contraseña incorrectos');
        }
      } else {
        console.log('No hay datos de usuario almacenados');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}