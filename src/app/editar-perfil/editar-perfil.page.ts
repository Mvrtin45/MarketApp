import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  formularioEditar: FormGroup;
  usuario: any;
  nombre: string = "";
  email: string = "";
  telefono!: number;
  usuario_Id!: number;

  constructor( 
    private fb: FormBuilder, 
    private router: Router, 
    private alertController: AlertController, 
    private storage: NativeStorage,
    private bd: ServicebdService,
    private platform: Platform
  ) {
    this.formularioEditar = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, this.phoneValidator()]],
    });
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  // MENSAJE DE ERROR EN NOMBRE
  get nombreErrorMessage() {
    const nombreControl = this.formularioEditar.get('nombre'); // Aquí es 'nombre'
  
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

  async cargarDatosUsuario() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      this.usuario_Id = storedUserId;
      if (storedUserId) {
        if (this.platform.is('cordova')) {
          const usuarioActual = await this.bd.obtenerDatosUsuario(storedUserId);
          if (usuarioActual && usuarioActual.nombre_usu) {
            this.usuario = usuarioActual;
            // Actualizar los valores en el formulario
            this.formularioEditar.patchValue({
              nombre: usuarioActual.nombre_usu,
              email: usuarioActual.email_usu,
              telefono: usuarioActual.telefono_usu,
            });
          } else {
            await this.mostrarAlerta('Error','No se pudo obtener los datos del usuario o los datos están incompletos.');
          }
        } else {
          await this.mostrarAlerta('Error','Cordova no está disponible. Este error solo ocurre en pruebas o navegador.');
        }
      } else {
        await this.mostrarAlerta('Error','No se pudo obtener el ID del usuario.');
      }
    } catch (error: unknown) {
    }
  }

  async guardarCambios() {
    if (this.formularioEditar.valid) {
      const { nombre, email, telefono } = this.formularioEditar.value;
  
      try {
        // Verificar si el correo ya existe en la base de datos
        const correoExiste = await this.bd.verificarCorreo(email);
  
        if (correoExiste && email !== this.usuario.email_usu) {
          // Si el correo existe y no pertenece al usuario actual, mostrar un mensaje de error
          await this.mostrarAlerta('Error','El correo ingresado ya está registrado con otro usuario.');
          return;
        }
  
        // Si el correo no está duplicado o pertenece al usuario actual, proceder con la actualización
        await this.bd.modificarUsuarioPerfil(nombre, email, telefono, this.usuario_Id);
  
        await this.mostrarAlerta( 'Completado', 'Cambios guardados exitosamente.');
        this.router.navigate(['/tabs/perfil']);
      } catch (error) {
        let mensaje = 'Ocurrió un error inesperado.';
        if (error instanceof Error) {
          mensaje = error.message;
        }
  
        await this.mostrarAlerta('Error', mensaje);
      }
    } else {
      await this.mostrarAlerta(
        'Error',
        'Por favor, completa los campos requeridos correctamente.'
      );
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
}
