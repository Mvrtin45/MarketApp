import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  formularioRecuperar: FormGroup;
  emailErrorMessage: string = '';
  correo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private bd: ServicebdService 
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

  ngOnInit() {}

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

    // Verificar si el correo existe en la base de datos
    const correoExiste = await this.bd.verificarCorreo(this.correo);
    if (!correoExiste) {
      this.emailErrorMessage = 'El correo ingresado no está registrado.';
      return;
    }

    // Si el correo existe, procede a enviar el correo de recuperación
    // Aquí puedes implementar la lógica para enviar el correo de recuperación
    await this.mostrarAlertaCorreoEnviado();
  }

  // Método para mostrar la alerta después de enviar el correo de recuperación
  async mostrarAlertaCorreoEnviado() {
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
