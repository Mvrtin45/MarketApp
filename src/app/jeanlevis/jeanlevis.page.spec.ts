import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanlevisPage } from './jeanlevis.page';

describe('JeanlevisPage', () => {
  let component: JeanlevisPage;
  let fixture: ComponentFixture<JeanlevisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeanlevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
