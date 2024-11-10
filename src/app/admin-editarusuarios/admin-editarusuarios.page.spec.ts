import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditarusuariosPage } from './admin-editarusuarios.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminEditarusuariosPage', () => {
  let component: AdminEditarusuariosPage;
  let fixture: ComponentFixture<AdminEditarusuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditarusuariosPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditarusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
