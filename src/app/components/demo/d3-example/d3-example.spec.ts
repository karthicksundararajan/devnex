import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3Example } from './d3-example';

describe('D3Example', () => {
  let component: D3Example;
  let fixture: ComponentFixture<D3Example>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3Example]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3Example);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
