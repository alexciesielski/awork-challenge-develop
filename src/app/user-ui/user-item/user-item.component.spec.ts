import { ComponentFixture, TestBed } from '@angular/core/testing';
import { USER_MOCK } from '../../user-api/user-mock';
import { User, mapUser } from '../../user-api/user.model';
import { UserItemComponent } from './user-item.component';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  const mockedUsers: User[] = USER_MOCK.map(mapUser);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserItemComponent);
    fixture.componentRef.setInput('user', mockedUsers[0]);
    fixture.componentRef.setInput('allUsers', mockedUsers);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the count of users with same nationality', () => {
    const expectedNationalitiesCount = 53;
    expect(component.sameNationalitiesCount()).toEqual(expectedNationalitiesCount);
  });
});
