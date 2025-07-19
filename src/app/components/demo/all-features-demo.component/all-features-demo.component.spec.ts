import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeaturesDemoComponent } from './all-features-demo.component';

describe('AllFeaturesDemoComponent', () => {
  let component: AllFeaturesDemoComponent;
  let fixture: ComponentFixture<AllFeaturesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFeaturesDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeaturesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
