import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirpubliPage } from './subirpubli.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('SubirpubliPage', () => {
  let component: SubirpubliPage;
  let fixture: ComponentFixture<SubirpubliPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirpubliPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirpubliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
