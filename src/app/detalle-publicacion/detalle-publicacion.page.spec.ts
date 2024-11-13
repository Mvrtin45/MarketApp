import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePublicacionPage } from './detalle-publicacion.page';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DetallePublicacionPage', () => {
  let component: DetallePublicacionPage;
  let fixture: ComponentFixture<DetallePublicacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePublicacionPage],
      imports: [IonicModule.forRoot()],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
