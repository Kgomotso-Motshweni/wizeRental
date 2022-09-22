import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytenantsComponent } from './mytenants.component';

describe('MytenantsComponent', () => {
  let component: MytenantsComponent;
  let fixture: ComponentFixture<MytenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
