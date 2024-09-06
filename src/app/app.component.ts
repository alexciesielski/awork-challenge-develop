import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { UserGroupCategory } from './user-api/user.model';
import { UserService } from './user-api/user.service';
import { UserListComponent } from './user-ui/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly userService = inject(UserService);

  readonly allUsers$ = this.userService.allUsers$;
  readonly usersLoading$ = this.userService.loading$;
  readonly searchUsersCtrl = this.userService.searchUsersCtrl;
  readonly groupedUsers$ = this.userService.groupedUsers$;
  readonly categories = this.userService.categories;

  constructor() {
    this.userService.fetchUsers().pipe(takeUntilDestroyed()).subscribe();
  }

  setCategory(category: UserGroupCategory | null) {
    this.userService.setCategory(category);
  }
}
