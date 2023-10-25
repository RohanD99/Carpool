import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRidesComponent } from './user-rides.component';

describe('UserRidesComponent', () => {
  let component: UserRidesComponent;
  let fixture: ComponentFixture<UserRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRidesComponent]
    });
    fixture = TestBed.createComponent(UserRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
