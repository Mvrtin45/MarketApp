import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFiltrarpubliPage } from './admin-filtrarpubli.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminFiltrarpubliPage', () => {
  let component: AdminFiltrarpubliPage;
  let fixture: ComponentFixture<AdminFiltrarpubliPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFiltrarpubliPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFiltrarpubliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
