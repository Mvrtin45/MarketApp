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
  formularioPago!: FormGroup;
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private bd: ServicebdService) {}

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
      // Simulación de procesamiento de pago
      setTimeout(() => {
        this.bd.finalizarCompra();
        this.cargando = false;
        this.router.navigate(['/check']);
      }, 2000);
    } else {
      console.log("Formulario de pago no válido");
    }
  }
}