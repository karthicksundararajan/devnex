import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableNodeComponent } from './resizable-node.component';

describe('ResizableNodeComponent', () => {
  let component: ResizableNodeComponent;
  let fixture: ComponentFixture<ResizableNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizableNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizableNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
