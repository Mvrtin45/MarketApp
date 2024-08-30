import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerasPage } from './poleras.page';

describe('PolerasPage', () => {
  let component: PolerasPage;
  let fixture: ComponentFixture<PolerasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PolerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
