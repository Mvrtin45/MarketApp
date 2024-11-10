import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapasadidascampusPage } from './zapasadidascampus.page';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('ZapasadidascampusPage', () => {
  let component: ZapasadidascampusPage;
  let fixture: ComponentFixture<ZapasadidascampusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapasadidascampusPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ZapasadidascampusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
