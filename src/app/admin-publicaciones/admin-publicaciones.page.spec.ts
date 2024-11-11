import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPublicacionesPage } from './admin-publicaciones.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';

describe('AdminPublicacionesPage', () => {
  let component: AdminPublicacionesPage;
  let fixture: ComponentFixture<AdminPublicacionesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPublicacionesPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
