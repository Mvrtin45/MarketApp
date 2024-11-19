import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilPage } from './editar-perfil.page';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('EditarPerfilPage', () => {
  let component: EditarPerfilPage;
  let fixture: ComponentFixture<EditarPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerfilPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [NativeStorage, FormBuilder, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('formulario no debe ser válido cuando los campos están vacíos', () => {
    expect(component.formularioEditar.valid).toBeFalsy();
  });
});
