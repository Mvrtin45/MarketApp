import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-zapatillas',
  templateUrl: './zapatillas.page.html',
  styleUrls: ['./zapatillas.page.scss'],
})
export class ZapatillasPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
}
