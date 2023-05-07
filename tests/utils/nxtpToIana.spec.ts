import { IanaName } from 'windows-iana';
import { nxtpToIana } from '../../src/utils/nxtpToIana';

describe('NxtptoIana', () => {
  it('should return the corresponding IANA names for a valid Nxtp timezone', () => {
    const validTz = 'TasmaniaStandardTime';
    const expectedIanaNames: IanaName[] = ['Australia/Hobart', 'Australia/Currie', 'Antarctica/Macquarie'];
    const result = nxtpToIana(validTz);

    expect(result).toEqual(expectedIanaNames);
  });

  it('should return the corresponding IANA names for a valid Nxtp timezone', () => {
    const validTz = 'MontevideoStandardTime';
    const expectedIanaNames: IanaName[] = ['America/Montevideo'];
    const result = nxtpToIana(validTz);

    expect(result).toEqual(expectedIanaNames);
    expect(result.length).toEqual(1);
  });

  it('should throw an error for an unknown Nxtp timezone', () => {
    const unknownTz = 'UnknownTimezone';

    expect(() => {
      nxtpToIana(unknownTz);
    }).toThrow(`Unknown timezone: ${unknownTz}`);
  });
});
