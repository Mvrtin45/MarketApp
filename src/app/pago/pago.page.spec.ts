import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoPage } from './pago.page';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PagoPage', () => {
  let component: PagoPage;
  let fixture: ComponentFixture<PagoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        NativeStorage,
        SQLite,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('deshabilitar el botón enviar cuando el formulario no es válido', () => {
    component.formularioPago.patchValue({
      numeroTarjeta: '',
      nombreTitular: '',
      fechaExpiracion: '',
      cvv: ''
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('ion-button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});