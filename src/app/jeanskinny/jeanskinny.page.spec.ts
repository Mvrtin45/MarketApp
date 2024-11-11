import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanskinnyPage } from './jeanskinny.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeanskinnyPage', () => {
  let component: JeanskinnyPage;
  let fixture: ComponentFixture<JeanskinnyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeanskinnyPage],
      imports: [IonicModule.forRoot()],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(JeanskinnyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
