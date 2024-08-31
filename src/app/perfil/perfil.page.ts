import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener datos del almacenamiento local
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      console.log('No hay datos de usuario almacenados');
    }
  }

  logout() {
    
    this.router.navigate(['/login']);
  }
}
