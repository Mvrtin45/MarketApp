import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-admin-editarusuarios',
  templateUrl: './admin-editarusuarios.page.html',
  styleUrls: ['./admin-editarusuarios.page.scss'],
})
export class AdminEditarusuariosPage implements OnInit {
  formularioEditar: FormGroup;
  usuario: any = {};

  constructor( 
    private fb: FormBuilder, 
    private router: Router, 
    private alertController: AlertController, 
    private activatedRouter: ActivatedRoute,
    private bd: ServicebdService
  ) {
    this.formularioEditar = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')],],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, this.phoneValidator()]],
    });

    this.activatedRouter.params.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    })
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

  modificar(){
    this.bd.modificarUsuario(
      this.usuario.usuario_id,
      this.usuario.nombre_usu, 
      this.usuario.email_usu, 
      this.usuario.telefono_usu,
      this.usuario.contrasena_usu,
      this.usuario.rol_usu,
    )
    this.router.navigate(['/admin-usuarios']);
  }
}
