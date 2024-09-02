import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  correo: string = "";
  telefono!: number;
  nombre: string = "";


  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router) {
      this.activatedRoute.queryParams.subscribe(params => {

        if(this.router.getCurrentNavigation()?.extras.state){
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.
        ["nom"];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.
        ["cor"];
        this.telefono = this.router.getCurrentNavigation()?.extras?.state?.
        ["telef"];
        
      }
    });
    }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
