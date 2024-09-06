import { Component, computed, HostListener, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap, timer } from 'rxjs';
import { User } from '../../user-api/user.model';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [UserDetailComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  public readonly user = input.required<User>();
  public readonly allUsers = input.required<User[]>();

  readonly expanded = signal(false);

  readonly EXPANSION_TIMING = 300;
  // Delays the emission of false by the amount of time it takes the panel to collapse. If we didn't do this the panel would collapse immediately (without animating nicely).
  //
  // We do this so we're able to render the detail component only if necessary (lazily), such that we don't consume (DOM) resources unnecessarily.
  readonly lazyRender = toSignal(
    toObservable(this.expanded).pipe(
      switchMap((expanded) => (expanded ? of(true) : timer(this.EXPANSION_TIMING).pipe(map(() => false)))),
    ),
  );

  @HostListener('click')
  onClick() {
    this.expanded.update((expanded) => !expanded);
  }

  readonly imageSrc = computed(() => {
    const user = this.user();
    return `${user.image}?id=${user.login.uuid}`;
  });

  /**
   * Get the count of users with same nationality
   */
  readonly sameNationalitiesCount = computed(() => {
    if (!this.allUsers().length) {
      return 0;
    }

    return this.allUsers().reduce((acc, user) => {
      return user.nat === this.user().nat ? acc + 1 : acc;
    }, 0);
  });
}
