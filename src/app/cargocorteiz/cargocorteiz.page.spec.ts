import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargocorteizPage } from './cargocorteiz.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';

describe('CargocorteizPage', () => {
  let component: CargocorteizPage;
  let fixture: ComponentFixture<CargocorteizPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargocorteizPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(CargocorteizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
