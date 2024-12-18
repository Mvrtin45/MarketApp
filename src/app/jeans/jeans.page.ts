import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jeans',
  templateUrl: './jeans.page.html',
  styleUrls: ['./jeans.page.scss'],
})
export class JeansPage implements OnInit {

  constructor(private alertController: AlertController) {}

  ngOnInit() {
  }
}
