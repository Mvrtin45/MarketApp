import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanfnPage } from './jeanfn.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('JeanfnPage', () => {
  let component: JeanfnPage;
  let fixture: ComponentFixture<JeanfnPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeanfnPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(JeanfnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
