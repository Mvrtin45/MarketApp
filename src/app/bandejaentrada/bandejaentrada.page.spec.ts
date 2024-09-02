import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BandejaentradaPage } from './bandejaentrada.page';

describe('BandejaentradaPage', () => {
  let component: BandejaentradaPage;
  let fixture: ComponentFixture<BandejaentradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaentradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
