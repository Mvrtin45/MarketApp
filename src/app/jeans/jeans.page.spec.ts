import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeansPage } from './jeans.page';

describe('JeansPage', () => {
  let component: JeansPage;
  let fixture: ComponentFixture<JeansPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
