import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let serviceBdMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Crear un mock para ServicebdService
    serviceBdMock = jasmine.createSpyObj('ServicebdService', ['seleccionarPublicaciones'], { listadoPublicaciones: of([{ id: 1, title: 'Publicación de prueba' }]) });
    serviceBdMock.seleccionarPublicaciones.and.returnValue(Promise.resolve()); // Simular que seleccionarPublicaciones siempre tiene éxito

    await TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ServicebdService, useValue: serviceBdMock }, // Usar el mock en lugar del servicio real
        NativeStorage,
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
