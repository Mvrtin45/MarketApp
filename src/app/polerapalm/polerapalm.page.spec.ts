import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerapalmPage } from './polerapalm.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PolerapalmPage', () => {
  let component: PolerapalmPage;
  let fixture: ComponentFixture<PolerapalmPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolerapalmPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(PolerapalmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
