import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  formularioPago!: FormGroup; // Formulario para el pago
  cargando = false; // Estado de carga

  constructor(private fb: FormBuilder, private router: Router, private bd: ServicebdService) {}

  ngOnInit() {
    this.formularioPago = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      nombreTitular: ['', [Validators.required, Validators.minLength(3)]],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  async procesarPago() {
    if (this.formularioPago.valid) {
      this.cargando = true;
      setTimeout(async () => {
        this.cargando = false;
        try {
          await this.bd.finalizarCompra();
          this.router.navigate(['/check']);
        } catch (error) {
          console.error('Error al finalizar la compra:', error);
        }
      }, 3000);
    }
  }
}