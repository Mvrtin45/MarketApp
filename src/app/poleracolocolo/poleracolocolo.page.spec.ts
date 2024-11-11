import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoleracolocoloPage } from './poleracolocolo.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PoleracolocoloPage', () => {
  let component: PoleracolocoloPage;
  let fixture: ComponentFixture<PoleracolocoloPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoleracolocoloPage],
      imports: [
        IonicModule.forRoot(),
         FormsModule// Agrega el módulo de NativeStorage aquí
      ],
      providers: [NativeStorage, SQLite] // Agrega el proveedor aquí
    }).compileComponents();

    fixture = TestBed.createComponent(PoleracolocoloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
