import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapasvapormaxPage } from './zapasvapormax.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapasvapormaxPage', () => {
  let component: ZapasvapormaxPage;
  let fixture: ComponentFixture<ZapasvapormaxPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapasvapormaxPage],
      imports: [
        IonicModule.forRoot(),
         FormsModule// Agrega el módulo de NativeStorage aquí
      ],
      providers: [NativeStorage, SQLite] // Agrega el proveedor aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ZapasvapormaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
