import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  formularioEditar: FormGroup;
  nombre: string = '';
  correo: string = '';
  telefono!: number;

  constructor( private fb: FormBuilder, private router: Router, private alertController: AlertController, private activatedRoute: ActivatedRoute
  ) {
    
    this.formularioEditar = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, this.phoneValidator()]],
    });

    
    this.activatedRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.["cor"];
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.["nom"];
        this.telefono = this.router.getCurrentNavigation()?.extras?.state?.["tel"];

        this.formularioEditar.patchValue({
          nombre: this.nombre,
          email: this.correo,
          telefono: this.telefono
        });
      }
    });
  }

  ngOnInit() {}

  // MENSAJE DE ERROR EN NOMBRE
  get nombreErrorMessage() {
    const nombreControl = this.formularioEditar.get('name');

    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('required')) {
      return 'El nombre es obligatorio.';
    }
    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('minlength')) {
      return 'El nombre debe tener al menos 3 caracteres.';
    }
    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('pattern')) {
      return 'El nombre solo debe contener letras.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN EMAIL
  get emailErrorMessage() {
    const emailControl = this.formularioEditar.get('email');

    if ((emailControl?.touched || emailControl?.dirty) && emailControl?.hasError('required')) {
      return 'El correo electrónico es obligatorio.';
    }
    if ((emailControl?.touched || emailControl?.dirty) && emailControl?.hasError('email')) {
      return 'Debe ingresar un correo electrónico válido.';
    }

    return null;
  }

  // MENSAJE DE ERROR EN TELEFONO
  get telefonoErrorMessage() {
    const telefonoControl = this.formularioEditar.get('telefono');

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

  // Validador para número de teléfono
  phoneValidator() {
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

  async guardarCambios() {
    if (this.formularioEditar.valid) {
      // Aquí podrías implementar la lógica para guardar los cambios
      // Por ejemplo, llamar a un servicio para actualizar la información del usuario

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Completado',
        message: 'Cambios guardados exitosamente.',
        buttons: ['OK']
      });

      await alert.present();

      // Redirigir a otra página si es necesario
      // this.router.navigate(['/some-path']);
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

