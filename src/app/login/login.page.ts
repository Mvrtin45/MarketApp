import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

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

      // Verificar credenciales para administrador
      if (formcorreo === 'admin@gmail.com' && formPassword === 'soyadmin123') {
        const alert = await this.alertController.create({
          header: 'Inicio de sesión exitoso.',
          message: 'Redirigiendo al apartado de administrador...',
          buttons: ['OK']
        });

        await alert.present();
        alert.onDidDismiss().then(() => {
          this.router.navigate(['/admin']);
        });
      } else {
        // Verificar si el correo existe en la base de datos
        this.bd.verificarUsuario(formcorreo, formPassword).then(
          async (usuarioExiste) => {
          if (usuarioExiste) {
            const alert = await this.alertController.create({
              header: 'Inicio de sesión exitoso.',
              message: 'Redirigiendo al perfil...',
              buttons: ['OK']
            });

            await alert.present();
            alert.onDidDismiss().then(() => {
              this.router.navigate(['/tabs/tab1']);
            });
          } else {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Correo o contraseña incorrectos.',
              buttons: ['OK']
            });

            await alert.present();
          }
        });
      }
    } else {
      // Mostrar alertas si el formulario no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa los campos requeridos correctamente.',
        buttons: ['OK']
      });

      await alert.present();
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
}
