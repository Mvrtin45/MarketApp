import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [NativeStorage, SQLite, NgControl] 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Campo de contraseña requerido', () => {
    const passwordControl = component.formularioLogin.get('password');
    passwordControl?.setValue(''); // campo vacío 
    passwordControl?.markAsTouched(); // marcar como tocado
    passwordControl?.markAsDirty(); // marcar como sucio
  
    expect(component.passwordErrorMessage).toBe('La contraseña es requerida');
  });
});
