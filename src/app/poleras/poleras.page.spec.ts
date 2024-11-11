import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerasPage } from './poleras.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PolerasPage', () => {
  let component: PolerasPage;
  let fixture: ComponentFixture<PolerasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolerasPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(PolerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
