import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAdvancedComponent } from './result-advanced.component';

describe('ResultAdvancedComponent', () => {
  let component: ResultAdvancedComponent;
  let fixture: ComponentFixture<ResultAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultAdvancedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
