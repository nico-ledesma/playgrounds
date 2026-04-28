import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { print } from '../utils/print.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const date1 = dayjs.utc().format();
const date2 = dayjs.tz('2026-10-08 12:00', 'America/New_York').format();

print(date1, date2);
