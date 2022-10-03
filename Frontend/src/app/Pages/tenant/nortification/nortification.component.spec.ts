import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NortificationComponent } from './nortification.component';

describe('NortificationComponent', () => {
  let component: NortificationComponent;
  let fixture: ComponentFixture<NortificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NortificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NortificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
