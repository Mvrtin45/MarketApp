import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [ServicebdService, NativeStorage, SQLite]
    }).compileComponents();

    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
