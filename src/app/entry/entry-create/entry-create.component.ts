import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { CategoryService } from 'src/app/category/category.service';
import { EntryService } from '../entry.service';
import { PersonService } from 'src/app/person/person.service';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Entry } from 'src/app/_model/entry';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  types: any[] = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categories: any[] = [];

  persons: any[] = [];

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

  onSubmit() {

    this.save();
  }

  fullUpdate() {
  }

  reset() {

    this.form.reset({ type: 'RECEITA' });
  }

  save() {

    const entry = this.form.value;

    this.entryService.save(entry).then((_response: Entry) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Lançamento salvo na base de dados!', icon: 'pi-check-circle' });

      this.reset();

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

  private initForm() {

    this.form = this.formBuilder.group({
      id: [],
      type: [ 'RECEITA', null ],
      dueDate: [ null, Validators.required ],
      paymentDate: [],
      description: [ null, [ Validators.required, Validators.minLength(5) ] ],
      value: [ null, Validators.required ],
      category: this.formBuilder.group({
        id: [ null, Validators.required ]
      }),
      person: this.formBuilder.group({
        id: [ null, Validators.required ]
      }),
      observation: []
    });
  }
}
