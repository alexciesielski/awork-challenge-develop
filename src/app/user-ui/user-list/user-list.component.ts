import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, input } from '@angular/core';
import { User } from '../../user-api/user.model';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [UserItemComponent, ScrollingModule],
})
export class UserListComponent {
  public readonly header = input.required<string>();
  public readonly allUsers = input.required<User[] | null>();
  public readonly users = input.required<User[] | null>();
}
