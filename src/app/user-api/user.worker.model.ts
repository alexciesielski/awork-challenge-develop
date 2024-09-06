import { Observable } from 'rxjs';
import { User, UserGroupCategory } from './user.model';

export interface UserWorkerInput {
  users: User[];
  groupBy: UserGroupCategory | null;
}

export type UserWorkerOutput = Array<{
  category: string;
  count: number;
  users: User[];
}>;

export interface UserProcessingFn {
  (input: UserWorkerInput): UserWorkerOutput;
}

export type UserProcessor = (input: UserWorkerInput) => Observable<UserWorkerOutput>;
