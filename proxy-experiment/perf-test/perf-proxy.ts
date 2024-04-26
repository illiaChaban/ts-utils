import { _ } from "../../src/fn-utils/pipe";

// const filter = (predicate: any) => (array: readonly any[]) =>
//   array.filter(predicate);

// const concat = (items: any[]) => (arr: any[]) => [...arr, ...items];

function pipe(value: any, ...fns: any[]): unknown {
  return fns.reduce((v, fn) => fn(v), value);
}

const proxy = new Proxy(
  {},
  {
    get(target: any, prop) {
      return (...args: any[]) =>
        (value: any) => {
          return value[prop](...args);
        };
    },
  }
);

const test = (() => {
  let time = 0;
  return () => {
    const name = "proxy: filter + concat " + ++time;
    console.time(name);

    for (let i = 0; i < 50000; i++) {
      pipe(
        [1, 2, 3],
        proxy.filter((x: any) => x % 2),
        proxy.concat([4])
      );
    }

    console.timeEnd(name);
  };
})();

test();
test();
test();
// proxy: filter 1: 13.181ms
// proxy: filter 2: 7.138ms
// proxy: filter 3: 4.211ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy: filter 1: 12.296ms
// proxy: filter 2: 7.369ms
// proxy: filter 3: 4.26ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy: filter 1: 12.261ms
// proxy: filter 2: 7.168ms
// proxy: filter 3: 4.415ms

// proxy + cache: filter 1: 13.234ms
// proxy + cache: filter 2: 8.225ms
// proxy + cache: filter 3: 4.945ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy + cache: filter 1: 12.174ms
// proxy + cache: filter 2: 7.988ms
// proxy + cache: filter 3: 4.426ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy + cache: filter 1: 11.565ms
// proxy + cache: filter 2: 7.506ms
// proxy + cache: filter 3: 4.671ms

// proxy: filter + concat 1: 20.899ms
// proxy: filter + concat 2: 14.382ms
// proxy: filter + concat 3: 11.568ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy: filter + concat 1: 19.777ms
// proxy: filter + concat 2: 15.273ms
// proxy: filter + concat 3: 11.235ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy: filter + concat 1: 19.19ms
// proxy: filter + concat 2: 14.211ms
// proxy: filter + concat 3: 10.786ms

// proxy + cache: filter + concat 1: 19.666ms
// proxy + cache: filter + concat 2: 14.938ms
// proxy + cache: filter + concat 3: 11.771ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy + cache: filter + concat 1: 20.064ms
// proxy + cache: filter + concat 2: 15.152ms
// proxy + cache: filter + concat 3: 12.347ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-proxy.ts
// proxy + cache: filter + concat 1: 19.984ms
// proxy + cache: filter + concat 2: 15.169ms
// proxy + cache: filter + concat 3: 13.186ms
