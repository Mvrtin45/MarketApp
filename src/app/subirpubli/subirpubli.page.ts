import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subirpubli',
  templateUrl: './subirpubli.page.html',
  styleUrls: ['./subirpubli.page.scss'],
})
export class SubirpubliPage implements OnInit {
  formularioPublicacion: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router,) {
    
    this.formularioPublicacion = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit() {}

  // Envío del formulario
  async subirPublicacion() {
    if (this.formularioPublicacion.valid) {
      
      const alert = await this.alertController.create({
        header: 'Publicación exitosa',
        buttons: ['OK']
      });
      
      await alert.present();
      alert.onDidDismiss().then(() => {
        this.router.navigate(['/tabs/perfil']);
      });
    } else {

      const alert = await this.alertController.create({
        header: 'Formulario inválido',
        message: 'Por favor, revise los campos y corrija los errores.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
