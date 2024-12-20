import { Component, OnInit } from '@angular/core';
import { ServicebdService } from '../services/servicebd.service';
import { Router } from '@angular/router';
 
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
 
  constructor(private bd: ServicebdService, private router: Router,) {}
 
  ngOnInit() {
  }
  
  logout() {
    this.router.navigate(['/login']);
  }
}
