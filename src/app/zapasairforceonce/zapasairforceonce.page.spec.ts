import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapasairforceoncePage } from './zapasairforceonce.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapasairforceoncePage', () => {
  let component: ZapasairforceoncePage;
  let fixture: ComponentFixture<ZapasairforceoncePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapasairforceoncePage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ZapasairforceoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
