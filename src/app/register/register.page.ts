import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegistro: FormGroup;
  telefono!: number;
  correo: string = "";
  nombre: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioRegistro = this.fb.group({
      email: ['', [Validators.required,
      Validators.email]
      ],
      password: ['', [Validators.required,
      Validators.minLength(8),
      this.uppercaseValidator(),
      this.lowercaseValidator(),
      this.numberValidator(),
      ]],
      confirmPassword: ['', [Validators.required]],
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')],
      ],
      phone: ['', [Validators.required, this.phonevalidator()]],
    }, { validator: this.matchPasswords('password', 'confirmPassword') });
  }

  ngOnInit() { }

  // MENSAJE DE ERROR EN LA CONTRASEÑA
  get passwordErrorMessage() {
    const passwordControl = this.formularioRegistro.get('password');

    if ((passwordControl?.touched || passwordControl?.dirty) && passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria.';
    }
    if ((passwordControl?.touched || passwordControl?.dirty) && passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if ((passwordControl?.touched || passwordControl?.dirty) && passwordControl?.hasError('lowercase')) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    }
    if ((passwordControl?.touched || passwordControl?.dirty) && passwordControl?.hasError('uppercase')) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    if ((passwordControl?.touched || passwordControl?.dirty) && passwordControl?.hasError('number')) {
      return 'La contraseña debe contener al menos un número.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN LA CONFIRMACIÓN DE CONTRASEÑA
  get confirmPasswordErrorMessage() {
    const confirmPasswordControl = this.formularioRegistro.get('confirmPassword');

    if ((confirmPasswordControl?.touched || confirmPasswordControl?.dirty) && confirmPasswordControl?.hasError('required')) {
      return 'La confirmación de la contraseña es obligatoria.';
    }
    if ((confirmPasswordControl?.touched || confirmPasswordControl?.dirty) && confirmPasswordControl?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN TELEFONO
  get telefonoErrorMessage() {
    const telefonoControl = this.formularioRegistro.get('phone');

    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('required')) {
      return 'El número de teléfono es obligatorio.';
    }
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('numeric')) {
      return 'El teléfono debe contener solo números.';
    }
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('minLength')) {
      return 'El número de teléfono debe tener al menos 8 dígitos.';
    }
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('maxLength')) {
      return 'El número de teléfono no puede tener más de 15 dígitos.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN EL NOMBRE
  get nombreErrorMessage() {
    const nombreControl = this.formularioRegistro.get('name');

    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('required')) {
      return 'El nombre es obligatorio.';
    }
    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('minLength')) {
      return 'El nombre debe tener al menos 3 caracteres.';
    }
    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('pattern')) {
      return 'El nombre solo debe contener letras.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN EMAIL
  get emailErrorMessage() {
    const emailControl = this.formularioRegistro.get('email');

    if ((emailControl?.touched || emailControl?.dirty) && emailControl?.hasError('required')) {
      return 'El correo electrónico es obligatorio.';
    }
    if ((emailControl?.touched || emailControl?.dirty) && emailControl?.hasError('email')) {
      return 'Debe ingresar un correo electrónico válido.';
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

  // Validador para numero de telefono
  phonevalidator() {
    return (control: any) => {
      const value = control.value || '';
      let errors: any = {};

      // Comprobación si contiene solo números
      if (!/^[0-9]+$/.test(value)) {
        errors.numeric = true;
      }

      // Comprobación de longitud mínima
      if (value.length < 8) {
        errors.minLength = { requiredLength: 8, actualLength: value.length };
      }

      // Comprobación de longitud máxima
      if (value.length > 15) {
        errors.maxLength = { requiredLength: 15, actualLength: value.length };
      }

      // Si hay errores, devolver el objeto de errores, de lo contrario, devolver null
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Validador para mayusculas en contraseña
  uppercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[A-Z]/.test(value) ? null : { uppercase: true };
    };
  }

  // Validador para minusculas en contraseña
  lowercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[a-z]/.test(value) ? null : { lowercase: true };
    };
  }

  // Validador para numeros en contraseña
  numberValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[0-9]/.test(value) ? null : { number: true };
    };
  }

  async registrar() {
    if (this.formularioRegistro.valid) {
      let navigationExtras: NavigationExtras = {
        state: {
          cor: this.correo,
        }
      };

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Completado',
        message: 'Registro exitoso. Redirigiendo al login...',
        buttons: ['OK']
      });

      await alert.present();


      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login'], navigationExtras);
      });
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
}

