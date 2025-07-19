import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNodeComponent } from './toolbar-node.component';

describe('ToolbarNodeComponent', () => {
  let component: ToolbarNodeComponent;
  let fixture: ComponentFixture<ToolbarNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
