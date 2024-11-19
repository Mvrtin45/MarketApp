import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar módulo para pruebas de HttpClient
import { MonedaService } from '../services/moneda.service';
import { ServicebdService } from '../services/servicebd.service';

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      imports: [IonicModule.forRoot(), FormsModule, HttpClientTestingModule], // Agregar HttpClientTestingModule
      providers: [ NativeStorage, SQLite, MonedaService, ServicebdService ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
