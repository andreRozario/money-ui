import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class Entry {

  type: any = 'RECEITA';
  dueDate: any = '';
  paymentDate: any = '';
  description: string = '';
  value: any = undefined;
  category: any = undefined;
  person: any = undefined;
  observation: string = '';
}

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent implements OnInit {

  entry: Entry = new Entry();

  types: any[] = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categories: any[] = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 }
  ];

  persons: any[] = [
    { label: 'André Timóteo do Rozário', value: 1 },
    { label: 'Alzira dos Santos Timóteo', value: 2 },
    { label: 'Marcelo Timóteo do Rozário', value: 3 }
  ];

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.initForm();
  }

  get dueDate(): any {

    return this.form.get('dueDate');
  }

  get description(): any {

    return this.form.get('description');
  }

  get value(): any {

    return this.form.get('value');
  }

  get category(): any {

    return this.form.get('category');
  }

  get person(): any {

    return this.form.get('person');
  }

  onSubmit() {

    console.warn(this.form.value);

    this.reset();
  }

  fullUpdate() {
  }

  reset() {

    this.form.reset({
      description: ''
    });
  }

  private initForm() {

    this.form = this.formBuilder.group({
      type: [ this.entry.type, null ],
      dueDate: [ this.entry.dueDate, Validators.required ],
      paymentDate: [ this.entry.paymentDate, null ],
      description: [ this.entry.description, [ Validators.required, Validators.minLength(5) ] ],
      value: [ this.entry.value, [ Validators.required ] ],
      category: [ this.entry.category, [ Validators.required ] ],
      person: [ this.entry.person, [ Validators.required ] ],
      observation: [ this.entry.observation, null ]
    });
  }

}
