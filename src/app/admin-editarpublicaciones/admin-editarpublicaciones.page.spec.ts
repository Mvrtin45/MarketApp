import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditarpublicacionesPage } from './admin-editarpublicaciones.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('AdminEditarpublicacionesPage', () => {
  let component: AdminEditarpublicacionesPage;
  let fixture: ComponentFixture<AdminEditarpublicacionesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditarpublicacionesPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite, ActivatedRoute] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditarpublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
