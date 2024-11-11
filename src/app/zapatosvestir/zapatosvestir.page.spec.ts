import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatosvestirPage } from './zapatosvestir.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapatosvestirPage', () => {
  let component: ZapatosvestirPage;
  let fixture: ComponentFixture<ZapatosvestirPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapatosvestirPage],
      imports: [
        IonicModule.forRoot(),
         FormsModule// Agrega el módulo de NativeStorage aquí
      ],
      providers: [NativeStorage, SQLite] // Agrega el proveedor aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ZapatosvestirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
