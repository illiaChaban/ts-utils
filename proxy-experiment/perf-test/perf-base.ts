import { _ } from "../../src/fn-utils/pipe";

const test = (() => {
  let time = 0;
  return () => {
    const name = "filter + concat - base " + ++time;
    console.time(name);

    for (let i = 0; i < 50000; i++) {
      [1, 2, 3].filter((x) => x % 2).concat([4]);
    }

    console.timeEnd(name);
  };
})();

test();
test();
test();
// filter - base 1: 5.552ms
// filter - base 2: 3.458ms
// filter - base 3: 0.765ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf.ts
// filter - base 1: 5.55ms
// filter - base 2: 3.498ms
// filter - base 3: 0.736ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf.ts
// filter - base 1: 5.386ms
// filter - base 2: 3.207ms
// filter - base 3: 1.067ms

// filter + concat - base 1: 9.569ms
// filter + concat - base 2: 7.904ms
// filter + concat - base 3: 5.126ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-base.ts
// filter + concat - base 1: 10.126ms
// filter + concat - base 2: 7.875ms
// filter + concat - base 3: 5.497ms
// IC-MacBook-Air:ts-utils illia_chaban$ npx ts-node proxy-experiment/perf-base.ts
// filter + concat - base 1: 10.403ms
// filter + concat - base 2: 8.402ms
// filter + concat - base 3: 5.209ms
