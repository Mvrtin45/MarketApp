import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanfnPage } from './jeanfn.page';

describe('JeanfnPage', () => {
  let component: JeanfnPage;
  let fixture: ComponentFixture<JeanfnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeanfnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
