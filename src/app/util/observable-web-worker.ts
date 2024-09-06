import { Observable } from 'rxjs';

/**
 * Returns an `Observable` which wraps the `Worker` from `workerGetter`.
 * The `Worker` in question is supposed to make single run i.e. only one `postMessage` from inside of the `Worker` gets evaluated.
 * @param workerGetter callback that returns the `Worker`
 *
 * @example
 * .pipe(
 *   switchMap(observableWebWorker(() => new Worker('./my-worker', {type: module})))
 * )
 *
 * The `workerGetter`s `Worker` has to implement the following functionality:
 * @example
 * addEventListener('message', ({data}) => {
 *  try {
 *    postMessage({data: my_worker_function(data), error: null});
 *  } catch(ex) {
 *    postMessage({data: null, error: ex || 'error'});
 *  }
 * })
 */
export function observableWebWorker<T, R>(workerOrworkerFn: Worker | (() => Worker), input: T): Observable<R> {
  return new Observable<R>((subscriber) => {
    const worker = typeof workerOrworkerFn === 'function' ? workerOrworkerFn() : workerOrworkerFn;
    worker.postMessage(input);
    worker.onmessage = ({ data }) => {
      subscriber.next(data);
      subscriber.complete();
    };
    worker.onerror = (error) => subscriber.error(error);
    return () => worker.terminate();
  });
}
