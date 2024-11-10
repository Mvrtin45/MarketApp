import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarcontrasenaPage } from './modificarcontrasena.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarcontrasenaPage', () => {
  let component: ModificarcontrasenaPage;
  let fixture: ComponentFixture<ModificarcontrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarcontrasenaPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
