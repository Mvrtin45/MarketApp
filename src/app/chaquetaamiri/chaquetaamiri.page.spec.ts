import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaquetaamiriPage } from './chaquetaamiri.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ChaquetaamiriPage', () => {
  let component: ChaquetaamiriPage;
  let fixture: ComponentFixture<ChaquetaamiriPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaquetaamiriPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ChaquetaamiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
