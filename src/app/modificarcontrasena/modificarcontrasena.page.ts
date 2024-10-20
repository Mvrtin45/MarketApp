import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular'; // Importa tu servicio de base de datos
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-modificarcontrasena',
  templateUrl: './modificarcontrasena.page.html',
  styleUrls: ['./modificarcontrasena.page.scss'],
})
export class ModificarcontrasenaPage implements OnInit {
  formularioModificarPassword: FormGroup;
  emailUsuarioActual: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private bd: ServicebdService// Instancia del servicio de base de datos
  ) {
    this.formularioModificarPassword = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.uppercaseValidator(), this.lowercaseValidator(), this.numberValidator()]],
      confirmNewPassword: ['', [Validators.required]],
    }, { validator: this.matchPasswords('newPassword', 'confirmNewPassword') });
  }

  ngOnInit() {
    this.obtenerEmailUsuarioActual();
  }

  // Obtiene el email del usuario actual desde NativeStorage
  async obtenerEmailUsuarioActual() {
    try {
      const data = await this.nativeStorage.getItem('usuario');
      this.emailUsuarioActual = data.email;
    } catch (error) {
      console.error('Error al obtener el email del usuario:', error);
    }
  }

  // Validación de error para la contraseña actual
  get currentPasswordErrorMessage() {
    const currentPasswordControl = this.formularioModificarPassword.get('currentPassword');
    if (currentPasswordControl?.touched && currentPasswordControl?.hasError('required')) {
      return 'La contraseña actual es obligatoria.';
    }
    return null;
  }

  // Validación de error para la nueva contraseña
  get newPasswordErrorMessage() {
    const newPasswordControl = this.formularioModificarPassword.get('newPassword');
    if (newPasswordControl?.touched && newPasswordControl?.hasError('required')) {
      return 'La nueva contraseña es obligatoria.';
    }
    if (newPasswordControl?.touched && newPasswordControl?.hasError('minlength')) {
      return 'La nueva contraseña debe tener al menos 8 caracteres.';
    }
    if (newPasswordControl?.touched && newPasswordControl?.hasError('uppercase')) {
      return 'La nueva contraseña debe contener al menos una letra mayúscula.';
    }
    if (newPasswordControl?.touched && newPasswordControl?.hasError('lowercase')) {
      return 'La nueva contraseña debe contener al menos una letra minúscula.';
    }
    if (newPasswordControl?.touched && newPasswordControl?.hasError('number')) {
      return 'La nueva contraseña debe contener al menos un número.';
    }
    return null;
  }

  // Validación de error para confirmar la nueva contraseña
  get confirmNewPasswordErrorMessage() {
    const confirmNewPasswordControl = this.formularioModificarPassword.get('confirmNewPassword');
    if (confirmNewPasswordControl?.touched && confirmNewPasswordControl?.hasError('required')) {
      return 'Es obligatorio confirmar la nueva contraseña.';
    }
    if (confirmNewPasswordControl?.touched && confirmNewPasswordControl?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  }

  // Validador para verificar que las contraseñas coincidan
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  // Validadores para mayúsculas, minúsculas y números en la contraseña
  uppercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[A-Z]/.test(value) ? null : { uppercase: true };
    };
  }

  lowercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[a-z]/.test(value) ? null : { lowercase: true };
    };
  }

  numberValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[0-9]/.test(value) ? null : { number: true };
    };
  }

  // Método para modificar la contraseña
  async modificarPassword() {
    if (this.formularioModificarPassword.valid) {
      const currentPassword = this.formularioModificarPassword.value.currentPassword;
      const newPassword = this.formularioModificarPassword.value.newPassword;

      // Verificar si la contraseña actual es correcta
      const esValida = await this.bd.verificarContrasena(currentPassword);
      if (esValida) {
        // Actualizar la contraseña
        await this.bd.actualizarContra(this.emailUsuarioActual, newPassword);
        const alert = await this.alertController.create({
          header: 'Completado',
          message: 'Contraseña modificada exitosamente.',
          buttons: ['OK']
        });
        await alert.present();
        alert.onDidDismiss().then(() => {
          this.router.navigate(['/tabs/perfil']);
        });
      } else {
        // Mostrar alerta si la contraseña actual no es correcta
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La contraseña actual no es correcta.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      // Mostrar alerta si el formulario no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa los campos requeridos correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
