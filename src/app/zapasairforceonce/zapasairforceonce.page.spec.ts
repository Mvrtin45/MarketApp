import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapasairforceoncePage } from './zapasairforceonce.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapasairforceoncePage', () => {
  let component: ZapasairforceoncePage;
  let fixture: ComponentFixture<ZapasairforceoncePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapasairforceoncePage],
      imports: [
        IonicModule.forRoot(),
         FormsModule
      ],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(ZapasairforceoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
