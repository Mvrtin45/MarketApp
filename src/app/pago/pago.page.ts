import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  formularioPago!: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private bd: ServicebdService, 
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.formularioPago = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      nombreTitular: ['', Validators.required],
      fechaExpiracion: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/(2[0-9])$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  async procesarPago() {
    if (this.formularioPago.valid) {
      this.cargando = true;
      try {
        await this.bd.finalizarCompra(); // Llama al método que procesa el pago
        this.cargando = false;
        this.router.navigate(['/check']); // Redirige al usuario
      } catch (error) {
        this.cargando = false;
        this.mostrarAlerta('Error', 'Ocurrió un problema al procesar el pago. Por favor, inténtelo nuevamente.');
        console.error('Error al procesar el pago:', error);
      }
    } else {
      this.mostrarAlerta('Formulario inválido', 'Por favor, revise los datos del formulario.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
