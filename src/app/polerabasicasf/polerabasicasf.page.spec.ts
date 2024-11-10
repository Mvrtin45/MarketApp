import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerabasicasfPage } from './polerabasicasf.page';
import { IonicModule } from '@ionic/angular/ionic-module';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PolerabasicasfPage', () => {
  let component: PolerabasicasfPage;
  let fixture: ComponentFixture<PolerabasicasfPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolerabasicasfPage],
      imports: [IonicModule.forRoot(), FormsModule, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PolerabasicasfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
