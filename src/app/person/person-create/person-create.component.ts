import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { CityService } from 'src/app/city/city.service';
import { PersonService } from '../person.service';
import { StateService } from 'src/app/state/state.service';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Person } from 'src/app/_model/person';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  cities: any[] = [];

  states: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private personService: PersonService,
    private stateService: StateService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {

    this.initForm();

    this.loadCities();

    this.loadStates();
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

    this.form.reset();
  }

  save() {

    const person = this.form.value;

    this.personService.save(person).then((_response: Person) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa salva na base de dados!', icon: 'pi-check-circle' });

      this.reset();

    }).catch(error => this.errorHandler.handle(error));
  }

  loadCities() {

    return this.cityService.findByStateId(26).then(cities => {

      this.cities = cities.map((s: { name: string; id: number; }) => ({ label: s.name, value: s.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  loadStates() {

    return this.stateService.findAll().then(states => {

      this.states = states.map((s: { name: string; id: number; }) => ({ label: s.name, value: s.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  private initForm() {

    this.form = this.formBuilder.group({

      id: [],
      name: [ null, [ Validators.required, Validators.minLength(5) ] ],

      address: this.formBuilder.group({
        location: [ null, Validators.required ],
        number: [ null, Validators.required ],
        complement: [ null, null ],
        district: [ null, [ Validators.required ] ],
        zipcode: [ null, [ Validators.required ] ],
        city: this.formBuilder.group({
          id: [ null, [ Validators.required ] ],
          state: this.formBuilder.group({
            id: [ null, [ Validators.required ] ]
          })
        })
      }),

      contacts: this.formBuilder.array([
        // this.formBuilder.control('')
      ]),

      status: [ true ]
    });
  }
}
