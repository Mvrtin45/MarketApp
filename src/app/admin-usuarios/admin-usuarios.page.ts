import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {
  
  producto: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.producto = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
      }
    });
  }

  ngOnInit() {
  }

  modificar() {
    this.bd.modificarProducto(
      this.producto.producto_id,
      this.producto.nombre,
      this.producto.descripcion,
      this.producto.talla,
      this.producto.ubicacion,
      this.producto.color,
      this.producto.precio
    );
  }
}
