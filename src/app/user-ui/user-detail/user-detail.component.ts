import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../user-api/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  public readonly user = input.required<User>();
}
