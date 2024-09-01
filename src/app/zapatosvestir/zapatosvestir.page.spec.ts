import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatosvestirPage } from './zapatosvestir.page';

describe('ZapatosvestirPage', () => {
  let component: ZapatosvestirPage;
  let fixture: ComponentFixture<ZapatosvestirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatosvestirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
