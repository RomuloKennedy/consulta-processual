import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number[]): string {
    if (!value || value.length < 5) return '';

    const [year, month, day, hour, minute, second = 0] = value;

    const formattedDate = new Date(year, month - 1, day, hour, minute, second);

    const dayString = day < 10 ? `0${day}` : `${day}`;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const hourString = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
    const secondString = second < 10 ? `0${second}` : `${second}`;

    return `${dayString}/${monthString}/${year} ${hourString}:${minuteString}:${secondString}`;
  }

}
