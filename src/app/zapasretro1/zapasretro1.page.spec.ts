import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zapasretro1Page } from './zapasretro1.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Zapasretro1Page', () => {
  let component: Zapasretro1Page;
  let fixture: ComponentFixture<Zapasretro1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Zapasretro1Page],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(Zapasretro1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
