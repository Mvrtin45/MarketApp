import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.activatedRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.["nom"];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.["cor"];
        this.telefono = this.router.getCurrentNavigation()?.extras?.state?.["telef"];

        // Prellenar el campo de correo en el formulario
        this.formularioLogin.patchValue({
          email : this.correo
        });
      }
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.formularioLogin.valid) {
      const formcorreo = this.formularioLogin.get('correo')?.value;
      const formPassword = this.formularioLogin.get('password')?.value;

      
      // Simular validación exitosa del inicio de sesión
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Inicio de sesión exitoso. Redirigiendo al perfil...',
        buttons: ['OK']
      });
      
      // Navegar al perfil y pasar el correo como NavigationExtras
      alert.onDidDismiss().then(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            correo : formcorreo
          }
        };
        this.router.navigate(['/tabs/tab1'], navigationExtras);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}