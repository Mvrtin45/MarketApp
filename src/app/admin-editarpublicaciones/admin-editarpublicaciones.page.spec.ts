import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditarpublicacionesPage } from './admin-editarpublicaciones.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminEditarpublicacionesPage', () => {
  let component: AdminEditarpublicacionesPage;
  let fixture: ComponentFixture<AdminEditarpublicacionesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditarpublicacionesPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditarpublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
