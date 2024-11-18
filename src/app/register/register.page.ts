import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegistro: FormGroup;
  nombre: string = "";
  email: string = "";
  telefono!: number;
  contrasena: string = "";
  rol: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private storage: NativeStorage,
    private bd: ServicebdService,
  ) {
    this.formularioRegistro = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator(), this.noWhitespaceValidator]],
      confirmPassword: ['', [Validators.required, this.noWhitespaceValidator]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$'), this.noWhitespaceValidator]],
      phone: ['', [Validators.required, this.phoneValidator(), this.noWhitespaceValidator]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required]
    }, { validator: this.matchPasswords('password', 'confirmPassword') });
  }

  ngOnInit() { }

  // Validador para verificar que no haya solo espacios en blanco
  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  // Validador de fortaleza de la contraseña
  passwordStrengthValidator() {
    return (control: any) => {
      const value = control.value || '';
      const errors: any = {};

      if (!/[A-Z]/.test(value)) errors.uppercase = true;
      if (!/[a-z]/.test(value)) errors.lowercase = true;
      if (!/[0-9]/.test(value)) errors.number = true;

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Validador de teléfono
  phoneValidator() {
    return (control: any) => {
      const value = control.value || '';
      const errors: any = {};

      if (!/^[0-9]+$/.test(value)) errors.numeric = true;
      if (value.length < 8) errors.minLength = { requiredLength: 8, actualLength: value.length };
      if (value.length > 15) errors.maxLength = { requiredLength: 15, actualLength: value.length };

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Validador de coincidencia de contraseñas
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) return;
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  async registrar() {
    if (this.formularioRegistro.valid) {
      const nuevoUsuario = {
        nombre: this.formularioRegistro.get('name')!.value,
        correo: this.formularioRegistro.get('email')!.value,
        telefono: this.formularioRegistro.get('phone')!.value,
        contrasena: this.formularioRegistro.get('password')!.value,
        imagen: '/assets/icon/logo.jpg',
        rol: 1,
        preguntaSeguridad1: this.formularioRegistro.get('securityQuestion')!.value,
        respuestaSeguridad1: this.formularioRegistro.get('securityAnswer')!.value,
      };
      this.bd.insertarUsuario(
        nuevoUsuario.nombre,
        nuevoUsuario.correo,
        nuevoUsuario.telefono,
        nuevoUsuario.contrasena,
        nuevoUsuario.imagen,
        nuevoUsuario.rol,
        nuevoUsuario.preguntaSeguridad1,
        nuevoUsuario.respuestaSeguridad1,
      ).then(async (usuarioId) => {
        await this.storage.setItem('usuario_id', usuarioId);

        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'Tu registro se ha completado correctamente.',
          buttons: ['OK']
        });

        await alert.present();
        alert.onDidDismiss().then(() => {
          this.router.navigate(['/login']);
        });

      }).catch(async (error) => {
        await this.mostrarAlerta('Formulario inválido', 'No se pudo completar el registro. Por favor, inténtalo de nuevo.');
      });
    } else {
      await this.mostrarAlerta('Error', 'Por favor, revise los campos y corrija los errores.');
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Métodos de generación de mensajes de error
  get nombreErrorMessage() {
    const nombreControl = this.formularioRegistro.get('name');
    if (nombreControl?.touched || nombreControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (nombreControl?.hasError('required')) return 'El nombre es obligatorio.';
      if (nombreControl?.hasError('minlength')) return 'El nombre debe tener al menos 3 caracteres.';
      if (nombreControl?.hasError('pattern')) return 'El nombre solo puede contener letras.';
      if (nombreControl?.hasError('whitespace')) return 'El nombre no puede estar vacío o ser solo espacios.';
    }
    return '';
  }

  get emailErrorMessage() {
    const emailControl = this.formularioRegistro.get('email');
    if (emailControl?.touched || emailControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (emailControl?.hasError('required')) return 'El correo es obligatorio.';
      if (emailControl?.hasError('email')) return 'Debe ingresar un correo válido.';
      if (emailControl?.hasError('whitespace')) return 'El correo no puede estar vacío o ser solo espacios.';
    }
    return '';
  }

  get telefonoErrorMessage() {
    const telefonoControl = this.formularioRegistro.get('phone');
    if (telefonoControl?.touched || telefonoControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (telefonoControl?.hasError('required')) return 'El teléfono es obligatorio.';
      if (telefonoControl?.hasError('numeric')) return 'El teléfono solo puede contener números.';
      if (telefonoControl?.hasError('minLength')) return 'El teléfono debe tener al menos 8 dígitos.';
      if (telefonoControl?.hasError('maxLength')) return 'El teléfono no puede tener más de 15 dígitos.';
      if (telefonoControl?.hasError('whitespace')) return 'El teléfono no puede estar vacío o ser solo espacios.';
    }
    return '';
  }

  get passwordErrorMessage() {
    const passwordControl = this.formularioRegistro.get('password');
    if (passwordControl?.touched || passwordControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (passwordControl?.hasError('required')) return 'La contraseña es obligatoria.';
      if (passwordControl?.hasError('minlength')) return 'La contraseña debe tener al menos 8 caracteres.';
      if (passwordControl?.hasError('uppercase')) return 'La contraseña debe tener al menos una letra mayúscula.';
      if (passwordControl?.hasError('lowercase')) return 'La contraseña debe tener al menos una letra minúscula.';
      if (passwordControl?.hasError('number')) return 'La contraseña debe tener al menos un número.';
      if (passwordControl?.hasError('whitespace')) return 'La contraseña no puede estar vacía o ser solo espacios.';
    }
    return '';
  }

  get confirmPasswordErrorMessage() {
    const confirmPasswordControl = this.formularioRegistro.get('confirmPassword');
    if (confirmPasswordControl?.touched || confirmPasswordControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (confirmPasswordControl?.hasError('required')) return 'La confirmación de contraseña es obligatoria.';
      if (confirmPasswordControl?.hasError('passwordMismatch')) return 'Las contraseñas no coinciden.';
      if (confirmPasswordControl?.hasError('whitespace')) return 'La confirmación de contraseña no puede estar vacía o ser solo espacios.';
    }
    return '';
  }

  get seguridadPreguntaErrorMessage() {
    const seguridadPreguntaControl = this.formularioRegistro.get('securityQuestion');
    if (seguridadPreguntaControl?.touched || seguridadPreguntaControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (seguridadPreguntaControl?.hasError('required')) return 'La pregunta de seguridad es obligatoria.';
    }
    return '';
  }

  get seguridadRespuestaErrorMessage() {
    const seguridadRespuestaControl = this.formularioRegistro.get('securityAnswer');
    if (seguridadRespuestaControl?.touched || seguridadRespuestaControl?.dirty) { // Mostrar solo si se ha tocado o modificado
      if (seguridadRespuestaControl?.hasError('required')) return 'La respuesta de seguridad es obligatoria.';
      if (seguridadRespuestaControl?.hasError('whitespace')) return 'La respuesta no puede estar vacía o ser solo espacios.';
    }
    return '';
  }
}


