import { Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';
import { UserHttpService } from './user-http.service';
import { USER_MOCK } from './user-mock';

@Injectable({ providedIn: 'root' })
export class UserHttpMockService implements Omit<UserHttpService, 'http' | 'apiUrl'> {
  getUsers() {
    return of(USER_MOCK).pipe(
      delay(500),
      map((results) => ({ results })),
    );
  }
}
