import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { firstValueFrom, of, take } from 'rxjs';
import { UserHttpMockService } from './user-http-mock.service';
import { UserHttpService } from './user-http.service';
import { USER_PROCESSING_FN, UserService } from './user.service';
import { processUsers } from './user.worker';
import { UserProcessor, UserWorkerInput } from './user.worker.model';

describe(UserService.name, () => {
  let service: UserService;
  let searchUsersCtrl: FormControl<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserHttpService,
          useClass: UserHttpMockService,
        },
        {
          provide: USER_PROCESSING_FN,
          // Could be made more type-safe by creating (or using one of the utilities I bring to every project)
          // to infer the useValue return type from the injection token
          useValue: ((input: UserWorkerInput) => of(processUsers(input))) satisfies UserProcessor,
        },
      ],
    });

    service = TestBed.inject(UserService);
    searchUsersCtrl = service.searchUsersCtrl;
  });

  describe('fetchUsers', () => {
    it('should toggle loading flag', fakeAsync(() => {
      service.loading$.pipe(take(1)).subscribe((loading) => expect(loading).toBe(false));

      service.fetchUsers().pipe(take(1)).subscribe();

      service.loading$.pipe(take(1)).subscribe((loading) => expect(loading).toBe(true));

      tick();

      service.loading$.pipe(take(1)).subscribe((loading) => expect(loading).toBe(true));

      discardPeriodicTasks();
    }));
  });

  describe('when state initialized', () => {
    beforeEach(async () => await firstValueFrom(service.fetchUsers()));

    it('should filter users based on search input', async () => {
      service.searchUsersCtrl.setValue('Mari');

      const groupedUsers = await firstValueFrom(service.groupedUsers$);
      expect(groupedUsers.length).toEqual(21);
      // Todo add more checks
    });

    it('should group users based on groupBy input', async () => {
      service.setCategory('nat');

      const groupedUsers = await firstValueFrom(service.groupedUsers$);
      expect(groupedUsers.length).toEqual(21);
      // Todo add more checks
    });

    it('should have correct category map and categories', () => {
      expect(service.categories).toEqual([
        { id: 'nat', label: 'Nationality' },
        { id: 'age', label: 'Age' },
        { id: 'gender', label: 'Gender' },
      ]);
    });
  });
});
