import { formatInTimeZone } from 'date-fns-tz';
import { IanaName } from 'windows-iana';

interface DateTimeData {
  date: string;
  time: string;
}

export function getDateTimeInTimeZone(ianas: IanaName[], date = new Date()): DateTimeData {
  // Get just the very first timezone from the list
  const iana = ianas[0];
  // Get the date in the requested timezone
  const tzDate = formatInTimeZone(date, iana, 'dd/MM/yyyy');
  // Get the time in the requested timezone
  const tzTime = formatInTimeZone(date, iana, 'HH:mm:ss');
  return {
    date: tzDate,
    time: tzTime,
  };
}

export function generateResponse(iana: IanaName[]): Buffer {
  const { date, time } = getDateTimeInTimeZone(iana);
  // const date = '25/12/2019';
  // 50 53 47 49 50 47 50 48 49 57
  // const time = '21:43:25';
  // 50 49 58 52 51 58 50 53

  // Initialize response, first byte is 1, which is the versions number
  const version = Buffer.from([1]);

  // Date and time lengths
  const lenghts = Buffer.from([date.length, time.length]);

  // Date and time as ascii strings
  const dateAndTime = Buffer.from(`${date}${time}`, 'utf8');

  // Concatenate all buffers
  const dataWithoutChecksum = Buffer.concat([version, lenghts, dateAndTime]);

  // Calculate checksum
  let checksum = 123;
  for (let i = 0; i < dataWithoutChecksum.length; i++) {
    checksum ^= dataWithoutChecksum[i];
  }

  return Buffer.concat([dataWithoutChecksum, Buffer.from([checksum])]);
}
