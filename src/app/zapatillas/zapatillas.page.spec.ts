import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasPage } from './zapatillas.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapatillasPage', () => {
  let component: ZapatillasPage;
  let fixture: ComponentFixture<ZapatillasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapatillasPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ZapatillasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
