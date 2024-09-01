import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolerapalmPage } from './polerapalm.page';

describe('PolerapalmPage', () => {
  let component: PolerapalmPage;
  let fixture: ComponentFixture<PolerapalmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PolerapalmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
