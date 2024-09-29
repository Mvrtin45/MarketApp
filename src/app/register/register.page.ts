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
  telefono!: number ;
  correo: string = "";
  nombre: string ="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioRegistro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.uppercaseValidator(),
          this.lowercaseValidator(),
        this.numberValidator()]], 
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, this.numbersvalidator()]]
    });
  }

  ngOnInit() { }

  get passwordErrorMessage() {
    const passwordControl = this.formularioRegistro.get('password');
    
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria.';
    } else if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    } else if (passwordControl?.hasError('lowercase')) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    } else if (passwordControl?.hasError('uppercase')) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    } else if (passwordControl?.hasError('number')) {
      return 'La contraseña debe contener al menos un número.';
    }
    
    return null;
  }

  get telefonoErrorMessage() {
    const telefonoControl = this.formularioRegistro.get('phone');

    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('required')) {
      return 'El número de teléfono es obligatorio.';
    } else
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('numeric')) {
      return 'El teléfono debe contener solo números.';
    } else
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('minLength')) {
      return 'El número de teléfono debe tener al menos 8 dígitos.';
    } else
    if ((telefonoControl?.touched || telefonoControl?.dirty) && telefonoControl?.hasError('maxLength')) {
      return 'El número de teléfono no puede tener más de 15 dígitos.';
    }
  
    return null;
  }

  // Validador para numero de telefono
  numbersvalidator(){
    return (control: any) => {
      const value = control.value || '';
      let errors: any = {};
  
      // Comprobación si contiene solo números
      if (!/^[0-9]+$/.test(value)) {
        errors.numeric = true; // Error si no es numérico
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

  // Validador para mayusculas
  uppercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[A-Z]/.test(value) ? null : { uppercase: true };
    };
  }

  // Validador para minusculas
  lowercaseValidator() {
    return (control: any) => {
      const value = control.value || '';
      return /[a-z]/.test(value) ? null : { lowercase: true };
    };
  }

  // Validador para numeros
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
          cor : this.correo,
        }
      };

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Registro exitoso. Redirigiendo al login...',
        buttons: ['OK']
      });

      await alert.present();

      
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login'], navigationExtras);
      });
    }
  }
}

