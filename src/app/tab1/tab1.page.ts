import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  imagenes: string[] = [
    '../assets/icon/vapormax.jpg',
    '../assets/icon/poleraudechile.jpg',
    '../assets/icon/airforceblancas.jpg',
    '../assets/icon/retro3.jpg',
    '../assets/icon/campus.jpg',
    '../assets/icon/jordan4blackcat.jpg',
    '../assets/icon/chaquetaamiri.jpg',
    '../assets/icon/jeansfn.jpg',
    '../assets/icon/polerabasica.jpg',
    '../assets/icon/polerapalm.jpg',
    '../assets/icon/poleracolocolo.jpg'
  ];

  descripciones: string[] = [
    'Las Nike Air VaporMax son una línea de zapatillas deportivas fabricadas por la marca Nike que se caracterizan por su suela exterior realizada con la tecnología de amortiguación llamada "Air".',
    'Polera oficial de la Universidad de Chile, diseñada para los fanáticos y estudiantes del equipo.',
    'Las icónicas zapatillas Air Force 1 en color blanco, un clásico atemporal que combina elegancia y comodidad.',
    'Las zapatillas Retro 3, una reimaginación de uno de los modelos más icónicos de la historia del calzado deportivo.',
    'Las Adidas Campus, un clásico atemporal con una estética retro que sigue marcando tendencia',
    'Las Air Jordan 4 Black Cat, un ícono del baloncesto y el estilo urbano, combinan un diseño elegante con una estética deportiva.',
    'La chaqueta Amiri fusiona elegancia y rebeldía con un toque de lujo.',
    'Los jeans de Fashion Nova se caracterizan por tener un diseño moderno y actualizado que sigue las últimas tendencias de la moda.',
    'Prenda básica sin estampado, muy versátil y combinable con todo! Además de cómoda.',
    'Una polera de la marca Palm generalmente se caracteriza por tener un diseño moderno y casual, ideal para un look relajado pero con estilo.',
    'Es una prenda oficial de Colo-Colo, ideal para mostrar tu pasión por el equipo con orgullo y estilo en cualquier ocasión.'
  ];

  currentIndex: number = 0;

  constructor(private router: Router) {}

  get currentImagen(): string {
    return this.imagenes[this.currentIndex];
  }

  get currentDescripcion(): string {
    return this.descripciones[this.currentIndex];
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.imagenes.length - 1;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.imagenes.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToMenu() {
    this.router.navigate(['/tabs/tab3']);
  }
}
