import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanskinnyPage } from './jeanskinny.page';

describe('JeanskinnyPage', () => {
  let component: JeanskinnyPage;
  let fixture: ComponentFixture<JeanskinnyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeanskinnyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
