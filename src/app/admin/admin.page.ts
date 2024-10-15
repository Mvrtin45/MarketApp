import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ServicebdService } from '../services/servicebd.service';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  productos: any[] = [];
  nombre: string = "";
  descripcion: string = "";
  talla: string = "";
  ubicacion: string = "";
  color: string = "";
  precio!: number;
 
  constructor(private itemService: ItemService,
    private bd: ServicebdService
  ) {}
 
  ngOnInit() {
  }
 
  addProducto() {
    this.bd.insertarPublicacion(this.nombre, this.descripcion, this.talla, this.ubicacion, this.color, this.precio);
  }
}
