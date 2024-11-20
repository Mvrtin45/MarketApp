import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminVentasPage } from './admin-ventas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminVentasPage', () => {
  let component: AdminVentasPage;
  let fixture: ComponentFixture<AdminVentasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVentasPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
