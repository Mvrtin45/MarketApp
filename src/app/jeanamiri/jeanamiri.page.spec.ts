import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanamiriPage } from './jeanamiri.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeanamiriPage', () => {
  let component: JeanamiriPage;
  let fixture: ComponentFixture<JeanamiriPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeanamiriPage],
      imports: [IonicModule.forRoot()],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();
    
    fixture = TestBed.createComponent(JeanamiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
