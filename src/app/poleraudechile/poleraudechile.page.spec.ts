import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoleraudechilePage } from './poleraudechile.page';

describe('PoleraudechilePage', () => {
  let component: PoleraudechilePage;
  let fixture: ComponentFixture<PoleraudechilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoleraudechilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
