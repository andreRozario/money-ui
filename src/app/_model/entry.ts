import { DatePipe } from "@angular/common";

import { Category } from "./category";
import { Person } from "./person";

export class Entry {

  id?: number;
  description?: string;
  dueDate?: Date;
  paymentDate?: Date;
  value?: number;
  observation?: string;
  type = 'RECEITA';
  category = new Category();
  person = new Person();

  static dateFormat(entry: Entry, datePipe: DatePipe): any {

    return {
      ...entry,
      dueDate: datePipe.transform(entry.dueDate, 'dd/MM/yyyy'),
      paymentDate: datePipe.transform(entry.paymentDate, 'dd/MM/yyyy')
    };
  }
}
