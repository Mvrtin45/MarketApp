import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaquetasPage } from './chaquetas.page';

describe('ChaquetasPage', () => {
  let component: ChaquetasPage;
  let fixture: ComponentFixture<ChaquetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaquetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
