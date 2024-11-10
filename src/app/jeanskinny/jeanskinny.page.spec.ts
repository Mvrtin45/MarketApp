import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanskinnyPage } from './jeanskinny.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeanskinnyPage', () => {
  let component: JeanskinnyPage;
  let fixture: ComponentFixture<JeanskinnyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeanskinnyPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(JeanskinnyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
