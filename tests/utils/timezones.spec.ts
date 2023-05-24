import { NxtpTimezones } from '../../src/utils/timezones';
import { nxtpToIana } from '../../src/utils/nxtpToIana';

describe('timezones integrity', () => {
  it('all timezones must be resolved', () => {
    const nxtpTimezones = Object.keys(NxtpTimezones).filter((item) => Number.isNaN(Number(item)));

    nxtpTimezones.forEach((nxtpTimezone: string) => {
      if (!nxtpToIana(nxtpTimezone)) {
        console.log(nxtpTimezone);
        throw new Error(`${nxtpTimezone} is not defined`);
      }
    });
  });
});
