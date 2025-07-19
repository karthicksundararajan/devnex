import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeNodeComponent } from './size-node.component';

describe('SizeNodeComponent', () => {
  let component: SizeNodeComponent;
  let fixture: ComponentFixture<SizeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
