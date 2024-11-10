import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeansaePage } from './jeansae.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeansaePage', () => {
  let component: JeansaePage;
  let fixture: ComponentFixture<JeansaePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeansaePage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(JeansaePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
