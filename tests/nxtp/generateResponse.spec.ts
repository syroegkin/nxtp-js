import { formatInTimeZone } from 'date-fns-tz';
import { IanaName } from 'windows-iana';
import { getDateTimeInTimeZone, generateResponse } from '../../src/nxtp/generateResponse';

jest.mock('date-fns-tz', () => ({
  formatInTimeZone: jest.fn(),
}));

describe('getDateTimeInTimeZone', () => {
  it('should return the formatted date and time in the specified timezone', () => {
    const ianas: IanaName[] = ['Europe/Paris', 'America/New_York'];
    const date = new Date();

    (formatInTimeZone as jest.Mock).mockReturnValueOnce('25/12/2019');
    (formatInTimeZone as jest.Mock).mockReturnValueOnce('21:43:25');

    const result = getDateTimeInTimeZone(ianas, date);

    expect(formatInTimeZone).toHaveBeenCalledWith(date, 'Europe/Paris', 'dd/MM/yyyy');
    expect(formatInTimeZone).toHaveBeenCalledWith(date, 'Europe/Paris', 'HH:mm:ss');
    expect(result).toEqual({
      date: '25/12/2019',
      time: '21:43:25',
    });
  });
});

describe('generateResponse', () => {
  it('should generate a buffer with the expected data and checksum', () => {
    const ianas: IanaName[] = ['Europe/Paris'];

    (formatInTimeZone as jest.Mock).mockReturnValueOnce('25/12/2019');
    (formatInTimeZone as jest.Mock).mockReturnValueOnce('21:43:25');

    const result = generateResponse(ianas);

    // Assertions for the expected buffer content
    expect(result).toEqual(
      Buffer.from([
        1, // Version
        10, // Date length
        8, // Time length
        50, 53, 47, 49, 50, 47, 50, 48, 49, 57, // Date as ASCII
        50, 49, 58, 52, 51, 58, 50, 53, // Time as ASCII
        117, // Checksum
      ]),
    );
  });
});
