import { TestBed } from '@angular/core/testing';

import { MonedaService } from './moneda.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

describe('MonedaService', () => {
  let service: MonedaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [HttpClient, HttpHandler] 
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(MonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
