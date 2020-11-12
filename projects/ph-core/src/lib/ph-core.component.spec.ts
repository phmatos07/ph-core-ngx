import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhCoreComponent } from './ph-core.component';

describe('PhCoreComponent', () => {
  let component: PhCoreComponent;
  let fixture: ComponentFixture<PhCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
