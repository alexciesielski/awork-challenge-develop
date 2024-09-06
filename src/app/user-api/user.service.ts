import { inject, Injectable, InjectionToken } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  finalize,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { mapToVoid } from '../util/map-to-void';
import { observableWebWorker } from '../util/observable-web-worker';
import { UserHttpService } from './user-http.service';
import { mapUser, User, UserGroupCategory } from './user.model';
import type { UserProcessor, UserWorkerInput, UserWorkerOutput } from './user.worker.model';

export const USER_PROCESSING_FN = new InjectionToken<UserProcessor>('USER_PROCESSING_FN', {
  factory: () => (input) =>
    of(input).pipe(
      switchMap(({ users, groupBy }) =>
        observableWebWorker<UserWorkerInput, UserWorkerOutput>(
          () => new Worker(new URL('./user.worker', import.meta.url), { type: 'module' }),
          { users, groupBy },
        ),
      ),
    ),
});

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(UserHttpService);
  private readonly userProcessignFn = inject(USER_PROCESSING_FN);

  readonly searchUsersCtrl = new FormControl('', { nonNullable: true });

  private readonly allUsers$$ = new BehaviorSubject<User[]>([]);
  readonly allUsers$ = this.allUsers$$.asObservable();

  private readonly loading$$ = new BehaviorSubject(false);
  readonly loading$ = this.loading$$.asObservable();

  private readonly groupBy$$ = new BehaviorSubject<UserGroupCategory | null>('nat');
  readonly groupBy$ = this.groupBy$$.asObservable();

  private readonly filteredUsers$ = combineLatest([
    this.allUsers$,
    this.searchUsersCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, search]) =>
      search
        ? users.filter((user) => `${user.firstname} ${user.lastname}`.toLowerCase().includes(search.toLowerCase()))
        : users,
    ),
  );

  readonly groupedUsers$ = combineLatest([this.filteredUsers$, this.groupBy$$]).pipe(
    map(([users, groupBy]) => ({ users, groupBy }) satisfies UserWorkerInput),
    switchMap((input) =>
      this.userProcessignFn(input).pipe(
        catchError((err) => {
          console.error(`UserService.fetchUsers: error in UserWorker`, err);
          return of([] as UserWorkerOutput);
        }),
        take(1),
      ),
    ),
  );

  private readonly categoryMap: {
    [key in UserGroupCategory]: {
      label: string;
    };
  } = {
    nat: { label: 'Nationality' },
    age: { label: 'Age' },
    gender: { label: 'Gender' },
  };
  readonly categories: { id: UserGroupCategory; label: string }[] = Object.entries(this.categoryMap).map(
    ([id, { label }]) => ({ id: id as UserGroupCategory, label }),
  );

  fetchUsers(): Observable<void> {
    console.debug(`UserService.fetchUsers: start`);
    this.setLoading(true);

    return this.http.getUsers().pipe(
      tap(() => console.debug(`UserService.fetchUsers: users fetched`)),
      map((response) => response.results),
      map((users) => users.map(mapUser)),
      tap((users) => this.allUsers$$.next(users)),
      finalize(() => this.setLoading(false)),
      finalize(() => console.debug(`UserService.fetchUsers: finished`)),
      mapToVoid(),
    );
  }

  setCategory(category: UserGroupCategory | null) {
    this.groupBy$$.next(category);
  }

  private setLoading(loading: boolean) {
    console.debug(`UserService.setLoading: ${loading}`);
    this.loading$$.next(loading);
  }
}
