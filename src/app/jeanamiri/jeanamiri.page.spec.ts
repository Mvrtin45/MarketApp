import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeanamiriPage } from './jeanamiri.page';

describe('JeanamiriPage', () => {
  let component: JeanamiriPage;
  let fixture: ComponentFixture<JeanamiriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeanamiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
