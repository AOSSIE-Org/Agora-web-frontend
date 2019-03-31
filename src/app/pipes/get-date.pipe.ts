import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';
import {MomentInput} from 'moment';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

  transform(date: String): String {
    const dateInput: MomentInput = <MomentInput>date;
    return Moment(dateInput, 'YYYY-MM-DDTHH:mm:ssZ', false).local(true).toDate().toLocaleString();
  }

}
