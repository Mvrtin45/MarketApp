import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeansaePage } from './jeansae.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeansaePage', () => {
  let component: JeansaePage;
  let fixture: ComponentFixture<JeansaePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeansaePage],
      imports: [IonicModule.forRoot()],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(JeansaePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
