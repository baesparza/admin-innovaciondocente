import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {

  transform(date, small: boolean = false): string {
    if (date === null) return '';
    return new Date(date.seconds * 1000) // unix date
      .toLocaleDateString(
        'es-ES', // lang
        (!small) // options
          ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          : { year: 'numeric', month: 'numeric', day: 'numeric' }
      );
  }

}
