import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilPage } from './editar-perfil.page';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';

describe('EditarPerfilPage', () => {
  let component: EditarPerfilPage;
  let fixture: ComponentFixture<EditarPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerfilPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
