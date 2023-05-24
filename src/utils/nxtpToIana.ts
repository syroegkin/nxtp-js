import { WINDOWS_TO_IANA_MAP, IanaName } from 'windows-iana';
import { NxtpTimezones } from './timezones';

const edgeCases = {
  GMT: 'GMTStandardTime',
  EST: 'EasternStandardTime',
  'Mid-AtlanticStandardTime': 'UTC-02',
  CET: 'CentralEuropeStandardTime',
  KamchatkaStandardTime: 'FijiStandardTime',
};

interface TzMap {
  readonly windowsName: string;
  readonly territory: string;
  readonly iana: readonly IanaName[];
  nxtpName: string;
}

// Prepare the map considering the format sent
export const tzMap: TzMap[] = WINDOWS_TO_IANA_MAP.map((entry) => ({
  ...entry,
  nxtpName: entry.windowsName.replace(/\s/g, ''),
}));

const nxtpTimezones = Object.keys(NxtpTimezones);

export function nxtpToIana(tz: string): IanaName[] {
  if (!nxtpTimezones.includes(tz)) {
    throw new Error(`Unknown timezone: ${tz}`);
  }
  if (edgeCases[tz]) {
    tz = edgeCases[tz];
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
