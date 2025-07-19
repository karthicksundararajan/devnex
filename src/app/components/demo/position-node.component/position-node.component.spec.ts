import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionNodeComponent } from './position-node.component';

describe('PositionNodeComponent', () => {
  let component: PositionNodeComponent;
  let fixture: ComponentFixture<PositionNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
