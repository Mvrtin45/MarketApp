import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanlevisPage } from './jeanlevis.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeanlevisPage', () => {
  let component: JeanlevisPage;
  let fixture: ComponentFixture<JeanlevisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeanlevisPage],
      imports: [IonicModule.forRoot()],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(JeanlevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
