import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoleracolocoloPage } from './poleracolocolo.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PoleracolocoloPage', () => {
  let component: PoleracolocoloPage;
  let fixture: ComponentFixture<PoleracolocoloPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoleracolocoloPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PoleracolocoloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
