import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeansaePage } from './jeansae.page';

describe('JeansaePage', () => {
  let component: JeansaePage;
  let fixture: ComponentFixture<JeansaePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeansaePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
