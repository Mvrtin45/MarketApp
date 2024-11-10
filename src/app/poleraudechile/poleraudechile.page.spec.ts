import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoleraudechilePage } from './poleraudechile.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PoleraudechilePage', () => {
  let component: PoleraudechilePage;
  let fixture: ComponentFixture<PoleraudechilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoleraudechilePage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PoleraudechilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
