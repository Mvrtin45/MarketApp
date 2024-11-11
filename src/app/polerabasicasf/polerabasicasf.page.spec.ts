import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerabasicasfPage } from './polerabasicasf.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PolerabasicasfPage', () => {
  let component: PolerabasicasfPage;
  let fixture: ComponentFixture<PolerabasicasfPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolerabasicasfPage],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [NativeStorage, HttpClient, HttpHandler, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(PolerabasicasfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
