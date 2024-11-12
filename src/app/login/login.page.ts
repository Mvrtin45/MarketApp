import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  email: string = '';
  telefono!: number;
  nombre: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.formularioLogin.valid) {
      const formcorreo = this.formularioLogin.get('email')?.value;
      const formPassword = this.formularioLogin.get('password')?.value;
  
      try {
        // Comprobamos si el usuario es el administrador
        if (formcorreo === 'admin@gmail.com' && formPassword === 'soyadmin123') {
          await this.mostrarAlerta('Inicio de sesión exitoso.', 'Redirigiendo al apartado de administrador...');
          this.router.navigate(['/admin']);
        } else {
          // Verificamos el usuario en la base de datos
          const usuario = await this.bd.verificarUsuario(formcorreo, formPassword);
  
          if (usuario) {
            // Comprobamos el estado del usuario
            const estado = await this.bd.comprobarEstadoUsuario(usuario.usuario_id);
  
            if (estado === 0) {  // Si el usuario está baneado
              await this.mostrarAlerta('Acceso denegado', 'Tu cuenta ha sido baneada.');
            } else {
              // Si el usuario está activo, guardamos los datos y lo redirigimos
              await this.storage.setItem('usuario_id', usuario.usuario_id);
              await this.mostrarAlerta('Inicio de sesión exitoso.', '¡Bienvenido a AppMarket!');
              this.router.navigate(['/tabs/tab1']);
            }
          } else {
            await this.mostrarAlerta('Error', 'Correo o contraseña incorrectos.');
          }
        }
      } catch (error) {
        await this.mostrarAlerta('Error', 'Ocurrió un problema al intentar iniciar sesión. Por favor, intenta de nuevo.');
      }
    } else {
      await this.mostrarAlerta('Error', 'Por favor, completa los campos requeridos correctamente.');
    }
  }

  // Método para obtener el mensaje de error del campo email
  get emailErrorMessage() {
    const emailControl = this.formularioLogin.get('email');
    if (emailControl?.touched || emailControl?.dirty) { 
      if (emailControl?.hasError('required')) {
        return 'El correo es requerido';
      } else if (emailControl?.hasError('email')) {
        return 'Por favor, ingrese un correo válido';
      } else if (emailControl?.hasError('whitespace')) {
        return 'El correo no debe contener espacios en blanco';
      }
    }
    return null;
  }

  // Método para obtener el mensaje de error del campo password
  get passwordErrorMessage() {
    const passwordControl = this.formularioLogin.get('password');
    if (passwordControl?.touched || passwordControl?.dirty) { 
      if (passwordControl?.hasError('required')) {
        return 'La contraseña es requerida';
      } else if (passwordControl?.hasError('whitespace')) {
        return 'La contraseña no debe contener espacios en blanco';
      }
    }
    return null;
  }

  // Validación personalizada para evitar espacios en blanco
  private noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').toString().trim().length === 0;
    return !isWhitespace ? null : { 'whitespace': true };
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