import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPublicacionesPage } from './admin-publicaciones.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminPublicacionesPage', () => {
  let component: AdminPublicacionesPage;
  let fixture: ComponentFixture<AdminPublicacionesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPublicacionesPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
