import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbVisualizer } from './db-visualizer';

describe('DbVisualizer', () => {
  let component: DbVisualizer;
  let fixture: ComponentFixture<DbVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
