import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscomprasPage } from './miscompras.page';

describe('MiscomprasPage', () => {
  let component: MiscomprasPage;
  let fixture: ComponentFixture<MiscomprasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscomprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
