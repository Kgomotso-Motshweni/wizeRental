import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNortificationComponent } from './send-nortification.component';

describe('SendNortificationComponent', () => {
  let component: SendNortificationComponent;
  let fixture: ComponentFixture<SendNortificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNortificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNortificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
