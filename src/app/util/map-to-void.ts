import { map } from 'rxjs';

export function mapTo<T>(value: T) {
  return map(() => value);
}

export function mapToVoid() {
  return mapTo<void>(undefined);
}
