import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyInputNodeComponent } from './only-input-node.component';

describe('OnlyInputNodeComponent', () => {
  let component: OnlyInputNodeComponent;
  let fixture: ComponentFixture<OnlyInputNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyInputNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyInputNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
