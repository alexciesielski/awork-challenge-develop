import { ComponentFixture, TestBed } from '@angular/core/testing';
import { USER_MOCK } from '../../user-api/user-mock';
import { mapUser, User } from '../../user-api/user.model';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const mockedUsers: User[] = USER_MOCK.map(mapUser);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    fixture.componentRef.setInput('header', 'DE');
    fixture.componentRef.setInput('allUsers', mockedUsers);
    fixture.componentRef.setInput(
      'users',
      mockedUsers.filter((user) => user.nat === 'DE'),
    );

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
