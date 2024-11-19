import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  correo: string = '';
  pregunta: string = '';
  respuesta: string = '';
  emailErrorMessage: string = '';
  securityErrorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private bd: ServicebdService
  ) {}

  ngOnInit() {}

  // Método para manejar la recuperación de contraseña
  async recuperarContrasena() {
    this.emailErrorMessage = '';
    this.securityErrorMessage = '';

    // Validar campos
    if (!this.correo) {
      this.emailErrorMessage = 'El correo es obligatorio.';
      return;
    }

    if (!this.pregunta) {
      this.securityErrorMessage = 'Selecciona una pregunta de seguridad.';
      return;
    }

    if (!this.respuesta) {
      this.securityErrorMessage = 'La respuesta de seguridad es obligatoria.';
      return;
    }

    // Verificar si el correo existe en la base de datos
    const correoExiste = await this.bd.verificarCorreo(this.correo);
    if (!correoExiste) {
      this.emailErrorMessage = 'El correo ingresado no está registrado.';
      return;
    }

    // Verificar la pregunta y respuesta de seguridad
    const seguridadValida = await this.bd.verificarPreguntaRespuesta(this.correo, this.pregunta, this.respuesta);
    if (!seguridadValida) {
      this.securityErrorMessage = 'La pregunta o respuesta de seguridad no coincide.';
      return;
    }

    // Si todo es válido, mostrar alerta de éxito
    await this.mostrarAlertaCorreoEnviado();
  }

  // Método para mostrar la alerta de recuperación
  async mostrarAlertaCorreoEnviado() {
    const alert = await this.alertController.create({
      header: 'Recuperación exitosa',
      message: 'Puedes proceder a cambiar tu contraseña.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
