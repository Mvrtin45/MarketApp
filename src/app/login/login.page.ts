import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
  correo: string = '';
  telefono!: number;
  nombre: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.formularioLogin.valid) {
      const formcorreo = this.formularioLogin.get('email')?.value;
      const formPassword = this.formularioLogin.get('password')?.value;
  
      try {
        // Verificar credenciales para administrador
        if (formcorreo === 'admin@gmail.com' && formPassword === 'soyadmin123') {
          await this.mostrarAlerta('Inicio de sesión exitoso.', 'Redirigiendo al apartado de administrador...');
          this.router.navigate(['/admin']);
        } else {
          // Verificar si el correo existe en la base de datos
          const usuario = await this.bd.verificarUsuario(formcorreo, formPassword);
  
          if (usuario) {
            // Almacenar usuario_id
            await this.storage.setItem('usuario_id', usuario.usuario_id); 
  
            await this.mostrarAlerta('Inicio de sesión exitoso.', '¡Bienvenido a AppMarket!');
            this.router.navigate(['/tabs/tab1']);
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
    if (emailControl?.hasError('required')) {
      return 'El correo es requerido';
    } else if (emailControl?.hasError('email')) {
      return 'Por favor, ingrese un correo válido';
    }
    return null;
  }

  // Método para obtener el mensaje de error del campo password
  get passwordErrorMessage() {
    const passwordControl = this.formularioLogin.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return null;
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
