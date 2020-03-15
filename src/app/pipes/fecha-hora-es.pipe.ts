import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHoraEs'
})
export class FechaHoraEsPipe implements PipeTransform {

  transform(fecha: any): any {
    let date = fecha.substring(0,10);
    return date.substring(8,10) + '-' + date.substring(5,7) + '-' + date.substring(0,4) + ' a las ' + fecha.substring(11,16);
  }
}
