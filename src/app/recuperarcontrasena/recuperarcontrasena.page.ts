import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  formularioRecuperar: FormGroup;
  emailErrorMessage: string = '';
  correo: string = "";

  constructor( private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.formularioRecuperar = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  ngOnInit() {
  }

  async recuperarContrasena() {
    this.emailErrorMessage = ''; // Reinicia el mensaje de error

    // Validaciones
    if (!this.correo) {
      this.emailErrorMessage = 'El correo es obligatorio.';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.correo)) {
      this.emailErrorMessage = 'Por favor, introduce un correo válido.';
      return;
    }

    // Aquí puedes implementar la lógica para enviar el correo de recuperación

    // Mostrar la alerta después de la acción
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Hemos enviado un enlace de recuperación de contraseña a tu correo.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir al login después de hacer clic en OK
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
