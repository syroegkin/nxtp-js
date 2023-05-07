import { WINDOWS_TO_IANA_MAP, IanaName } from 'windows-iana';
import { NxtpTimezones } from './timezones';

// Prepare the map considering the format sent
const tzMap = WINDOWS_TO_IANA_MAP.map((entry) => ({
  ...entry,
  nxtpName: entry.windowsName.replace(/\s/g, ''),
}));

const nxtpTimezones = Object.keys(NxtpTimezones);

export function nxtpToIana(tz: string): IanaName[] {
  if (!nxtpTimezones.includes(tz)) {
    throw new Error(`Unknown timezone: ${tz}`);
  }
  if (tz === 'GMT') {
    tz = 'GMTStandardTime';
  }
  const set = new Set<IanaName>();

  tzMap.filter((it) => it.nxtpName === tz)
    .map((it) => it.iana)
    .flat()
    .forEach((it) => set.add(it));

  if (!set.size) {
    throw new Error(`Can not resolve timezone: ${tz}`);
  }
  return Array.from(set);
}
