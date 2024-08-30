import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }
  IrPagina(){
    this.router.navigate(['/agregar']);
  }

}
