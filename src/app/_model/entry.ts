import { DatePipe } from "@angular/common";

import { Category } from "./category";
import { Person } from "./person";

export class Entry {

  id!: number;
  description!: string;
  dueDate!: Date;
  paymentDate!: Date;
  value!: number;
  observation!: string;
  type = 'RECEITA';
  category = new Category();
  person = new Person();

  static dateFormat(entry: Entry, datePipe: DatePipe): any {

    return {
      ...entry,
      dueDate: Entry.dateValidation(entry.dueDate, datePipe),
      paymentDate: Entry.dateValidation(entry.paymentDate, datePipe)
    };
  }

  static dateValidation(date: any, datePipe: DatePipe): Date | string {

    return (date instanceof Date) ? datePipe.transform(date, 'dd/MM/yyyy') : date;
  }
}
