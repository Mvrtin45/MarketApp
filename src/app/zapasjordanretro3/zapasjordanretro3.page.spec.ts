import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zapasjordanretro3Page } from './zapasjordanretro3.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Zapasjordanretro3Page', () => {
  let component: Zapasjordanretro3Page;
  let fixture: ComponentFixture<Zapasjordanretro3Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Zapasjordanretro3Page],
      imports: [
        IonicModule.forRoot(),
         FormsModule
      ],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(Zapasjordanretro3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
