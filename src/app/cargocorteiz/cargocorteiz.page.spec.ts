import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargocorteizPage } from './cargocorteiz.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CargocorteizPage', () => {
  let component: CargocorteizPage;
  let fixture: ComponentFixture<CargocorteizPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargocorteizPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(CargocorteizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
