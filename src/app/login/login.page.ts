import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    
  }

  ingresar() {
    if (this.formularioLogin.valid) {
      // Maneja el inicio de sesión aquí
      console.log('Formulario válido:', this.formularioLogin.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}

