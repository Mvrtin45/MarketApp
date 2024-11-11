import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsuariosPage } from './admin-usuarios.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';

describe('AdminUsuariosPage', () => {
  let component: AdminUsuariosPage;
  let fixture: ComponentFixture<AdminUsuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUsuariosPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
