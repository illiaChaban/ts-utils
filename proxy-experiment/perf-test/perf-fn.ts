import { _ } from "../../src/fn-utils/pipe";

const filter = (predicate: any) => (array: readonly any[]) =>
  array.filter(predicate);

const concat = (items: any[]) => (arr: any[]) => [...arr, ...items];

function pipe(value: any, ...fns: any[]): unknown {
  return fns.reduce((v, fn) => fn(v), value);
}

const test = (() => {
  let time = 0;
  return () => {
    const name = "newPipe: filter + concat - fn  " + ++time;
    console.time(name);

    for (let i = 0; i < 50000; i++) {
      pipe(
        [1, 2, 3],
        filter((x: any) => x % 2),
        concat([4])
      );
    }

    console.timeEnd(name);
  };
})();

test();
test();
test();

// newPipe: filter - fn  1: 10.178ms
// newPipe: filter - fn  2: 5.208ms
// newPipe: filter - fn  3: 2.41ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-fn.ts
// newPipe: filter - fn  1: 10.327ms
// newPipe: filter - fn  2: 5.426ms
// newPipe: filter - fn  3: 2.631ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-fn.ts
// newPipe: filter - fn  1: 11.83ms
// newPipe: filter - fn  2: 5.803ms
// newPipe: filter - fn  3: 2.875ms

// newPipe: filter + concat - fn  1: 13.252ms
// newPipe: filter + concat - fn  2: 7.055ms
// newPipe: filter + concat - fn  3: 4.787ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-fn.ts
// newPipe: filter + concat - fn  1: 12.784ms
// newPipe: filter + concat - fn  2: 7.077ms
// newPipe: filter + concat - fn  3: 4.945ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-fn.ts
// newPipe: filter + concat - fn  1: 12.841ms
// newPipe: filter + concat - fn  2: 7.481ms
// newPipe: filter + concat - fn  3: 5.232ms
