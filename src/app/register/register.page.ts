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
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  async registrar() {
    if (this.formularioRegistro.valid) {
      let navigationExtras: NavigationExtras = {
        state: {
          cor : this.correo,
          telef : this.telefono,
          nom : this.nombre
        }
      };

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Registro exitoso. Redirigiendo al login...',
        buttons: ['OK']
      });

      await alert.present();

      
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/login'], navigationExtras);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
