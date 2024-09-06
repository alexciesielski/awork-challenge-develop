import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { UserGroupCategory } from './user-api/user.model';
import { UserService } from './user-api/user.service';
import { UserListComponent } from './user-ui/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly userService = inject(UserService);

  readonly allUsers = toSignal(this.userService.allUsers$);
  readonly usersLoading = toSignal(this.userService.loading$);
  readonly groupedUsers = toSignal(this.userService.groupedUsers$);
  readonly searchUsersCtrl = this.userService.searchUsersCtrl;
  readonly categories = this.userService.categories;

  constructor() {
    this.userService.fetchUsers().pipe(takeUntilDestroyed()).subscribe();
  }

  setCategory(category: UserGroupCategory | null) {
    this.userService.setCategory(category);
  }
}
