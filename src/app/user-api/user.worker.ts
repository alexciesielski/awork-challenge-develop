import { User } from './user.model';
import type { UserProcessingFn, UserWorkerInput, UserWorkerOutput } from './user.worker.model';

addEventListener('message', ({ data }) => {
  try {
    const input: UserWorkerInput = data;

    if (!Array.isArray(input.users)) {
      throw new Error(`UserWorker: invalid input data (users)`);
    }

    const output: UserWorkerOutput = processUsers(input);
    console.debug(`UserWorker: processed ${input.users.length} users`);
    postMessage(output);
  } catch (ex) {
    console.error(`UserWorker: error processing users`, ex);
    throw ex;
  }
});

export function processUsers(input: UserWorkerInput): UserWorkerOutput {
  const users = input.users;
  const groupBy = input.groupBy;

  if (!groupBy) {
    console.debug(`UserWorker: processing ${users.length} users`);
    return [{ category: 'All', users, count: users.length }];
  }

  console.debug(`UserWorker: grouping ${users.length} users by ${groupBy}`);

  const groupedUsers = users.reduce(
    (acc, user) => {
      const category = user[groupBy];
      acc[category] = acc[category] || [];
      acc[category].push(user);
      return acc;
    },
    {} as Record<string, User[]>,
  );
  return Object.entries(groupedUsers).map(([category, users]) => ({ category, users, count: users.length }));
}

// Type-safety check of the above function
// If the function signature changes, this line will throw a type error
const __processUsers_TypeCheck__: UserProcessingFn = processUsers;
