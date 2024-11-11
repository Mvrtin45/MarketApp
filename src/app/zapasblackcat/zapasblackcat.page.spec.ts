import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapasblackcatPage } from './zapasblackcat.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ZapasblackcatPage', () => {
  let component: ZapasblackcatPage;
  let fixture: ComponentFixture<ZapasblackcatPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZapasblackcatPage],
      imports: [
        IonicModule.forRoot(),
         FormsModule
      ],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(ZapasblackcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
