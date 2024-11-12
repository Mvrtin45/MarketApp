import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(),FormsModule, ReactiveFormsModule],
      providers: [NativeStorage, SQLite, NgControl] 
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inicializar el formulario como inválido', () => {
    expect(component.formularioRegistro.valid).toBeFalsy();
  });

  it('formulario como válido cuando los campos estén correctamente', () => {
    component.formularioRegistro.setValue({
      email: 'test@ejemplo.com',
      password: 'Password1',
      confirmPassword: 'Password1',
      name: 'Martin Gomez',
      phone: '12345678'
    });
    expect(component.formularioRegistro.valid).toBeTruthy();
  });

  it('requerir el campo de email', () => {
    const emailControl = component.formularioRegistro.get('email');
    expect(emailControl).not.toBeNull();  // Verificar que el control existe
  
    if (emailControl) {
      emailControl.setValue(''); // Comprobar que este vacío el campo de email
      expect(emailControl.valid).toBeFalse();
      expect(emailControl.errors?.['required']).toBeTruthy();
    }
  });

  it('requerir el campo de teléfono', () => {
    const phoneControl = component.formularioRegistro.get('phone');
    expect(phoneControl).not.toBeNull();  // Verificar que el control existe

    if (phoneControl) {
      phoneControl.setValue(''); // Comprobar que este vacío el campo de telefono
      expect(phoneControl.valid).toBeFalse();
      expect(phoneControl.errors?.['required']).toBeTruthy();
    }
  });
});
