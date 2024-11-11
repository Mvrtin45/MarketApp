import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('RecuperarcontrasenaPage', () => {
  let component: RecuperarcontrasenaPage;
  let fixture: ComponentFixture<RecuperarcontrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarcontrasenaPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
