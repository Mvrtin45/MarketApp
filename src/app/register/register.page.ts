import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator]]
    });
  }

  ngOnInit() {}

  
  fechaNacimientoValidator(control: FormControl) {
    const fecha = control.value;
    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return fechaRegex.test(fecha) ? null : { formatoFecha: true };
  }

  async registrar() {
    if (this.formularioRegistro.valid) {
  
      console.log(this.formularioRegistro.value);

  
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Tu registro ha sido exitoso. Redirigiendo al inicio de sesión...',
        buttons: [{
          text: 'OK',
          handler: () => {
  
            this.router.navigate(['/login']);
          }
        }]
      });

      await alert.present();
    } else {
      console.log('Formulario inválido');
    }
  }
}
