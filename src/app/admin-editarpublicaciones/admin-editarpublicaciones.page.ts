import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-editarpublicaciones',
  templateUrl: './admin-editarpublicaciones.page.html',
  styleUrls: ['./admin-editarpublicaciones.page.scss'],
})
export class AdminEditarpublicacionesPage implements OnInit {
  formularioEditar: FormGroup;
  publicacion: any;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private alertController: AlertController, 
    private activatedRouter: ActivatedRoute,
    private bd: ServicebdService
  ) { 
    this.formularioEditar = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(1)]], 
      ubicacion: ['', Validators.required],
      talla: ['', Validators.required],
      color: ['', Validators.required],
    });

    this.activatedRouter.params.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    })
  }

  ngOnInit() {
  }

  modificar(){
    this.bd.modificarPublicacion(
      this.publicacion.producto_id,
      this.publicacion.titulo,
      this.publicacion.descripcion,
      this.publicacion.talla,
      this.publicacion.ubicacion,
      this.publicacion.color, 
      this.publicacion.precio, 
    )
    this.router.navigate(['/admin-publicaciones']);
  }

  // Método para mostrar mensajes de error
  getErrorMessage(field: string): string {
    const control = this.formularioEditar.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength')?.requiredLength;
      return `El máximo de caracteres es ${maxLength}`;
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }
    return '';
  }
}
