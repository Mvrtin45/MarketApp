import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosPage } from './favoritos.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('FavoritosPage', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritosPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [NativeStorage, SQLite] 
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
