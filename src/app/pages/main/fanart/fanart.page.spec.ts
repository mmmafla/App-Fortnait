import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanartPage } from './fanart.page';

describe('FanartPage', () => {
  let component: FanartPage;
  let fixture: ComponentFixture<FanartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FanartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
