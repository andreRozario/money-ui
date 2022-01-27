import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { CategoryService } from 'src/app/category/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonService } from 'src/app/person/person.service';
import { Entry } from 'src/app/_model/entry';
import { EntryService } from '../entry.service';

// class Entry {

//   type: any = 'RECEITA';
//   dueDate: any = '';
//   paymentDate: any = '';
//   description: string = '';
//   value: any = undefined;
//   category: any = undefined;
//   person: any = undefined;
//   observation: string = '';
// }

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

  categories: any[] = [];

  persons: any[] = [];

  form: FormGroup = new FormGroup({}); //  as { [key in keyof Entry]: FormControl }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private entryService: EntryService,
    private personService: PersonService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {

    this.initForm();

    this.loadCategories();

    this.loadPersons();
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  // readonly fcName: { [key in keyof Entry]: key } = {

  //   id: 'id',
  //   type: 'type',
  //   dueDate: 'dueDate',
  //   paymentDate: 'paymentDate',
  //   description: 'description',
  //   value: 'value',
  //   category: 'category',
  //   person: 'person',
  //   observation: 'observation'
  // }

  // get type(): any {

  //   return this.form.get('type');
  // }

  // get dueDate(): any {

  //   return this.form.get('dueDate');
  // }

  // get paymentDate(): any {

  //   return this.form.get('paymentDate');
  // }

  // get description(): any {

  //   return this.form.get('description');
  // }

  // get value(): any {

  //   return this.form.get('value');
  // }

  // get category(): any {

  //   return this.form.get('category');
  // }

  // get person(): any {

  //   return this.form.get('person');
  // }

  // get observation(): any {

  //   return this.form.get('observation');
  // }

  onSubmit() {

    console.warn(this.form.value);

    this.save();
  }

  fullUpdate() {
  }

  reset() {

    this.form.reset();
  }

  save() {

    this.modelBinding();

    console.log(this.entry);

    this.entryService.save(this.entry).then((response: Entry) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Lançamento salvo na base de dados!', icon: 'pi-check-circle' });

      this.reset();

      this.entry = new Entry();

    }).catch(error => this.errorHandler.handle(error));
  }

  loadCategories() {

    return this.categoryService.findAll().then(categories => {

      this.categories = categories.map((c: { name: string; id: number; }) => ({ label: c.name, value: c.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  loadPersons() {

    return this.personService.findAll().then(persons => {

      this.persons = persons.map((p: { name: string; id: number; }) => ({ label: p.name, value: p.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  private modelBinding() {

    this.entry = this.form.value;
  }

  private initForm() {

    this.form = this.formBuilder.group({
      type: [ this.entry.type, null ],
      dueDate: [ this.entry.dueDate, Validators.required ],
      paymentDate: [ this.entry.paymentDate, null ],
      description: [ this.entry.description, [ Validators.required, Validators.minLength(5) ] ],
      value: [ this.entry.value, Validators.required ],
      category: [ this.entry.category, Validators.required ],
      person: [ this.entry.person, Validators.required ],
      observation: [ this.entry.observation, null ]
    });
  }

}
