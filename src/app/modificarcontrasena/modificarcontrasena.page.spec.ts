import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarcontrasenaPage } from './modificarcontrasena.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModificarcontrasenaPage', () => {
  let component: ModificarcontrasenaPage;
  let fixture: ComponentFixture<ModificarcontrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarcontrasenaPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        NativeStorage,
        SQLite,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inicialización del formulario', () => {
    expect(component.formularioModificarPassword.contains('newPassword')).toBeTruthy();
    expect(component.formularioModificarPassword.contains('confirmNewPassword')).toBeTruthy();
  });
});