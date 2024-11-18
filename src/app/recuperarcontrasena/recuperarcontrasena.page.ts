import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  formularioRecuperar: FormGroup;
  correo: string = '';
  emailErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private bd: ServicebdService
  ) {
    // Definición del formulario con validaciones
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

  // Método para enviar el correo de recuperación de contraseña
  async enviarCorreo() {
    this.emailErrorMessage = ''; // Reinicia el mensaje de error

    // Validación del correo
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
    await this.mostrarAlertaCorreoEnviado();
  }

  // Método para mostrar la alerta de correo enviado con el enlace de recuperación
  async mostrarAlertaCorreoEnviado() {
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Hemos enviado un enlace de recuperación de contraseña a tu correo.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige al login después de hacer clic en OK
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
