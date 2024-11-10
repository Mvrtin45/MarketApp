import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeansPage } from './jeans.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeansPage', () => {
  let component: JeansPage;
  let fixture: ComponentFixture<JeansPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeansPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(JeansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
