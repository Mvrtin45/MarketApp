import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditarusuariosPage } from './admin-editarusuarios.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('AdminEditarusuariosPage', () => {
  let component: AdminEditarusuariosPage;
  let fixture: ComponentFixture<AdminEditarusuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditarusuariosPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [NativeStorage, SQLite, ActivatedRoute] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditarusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
