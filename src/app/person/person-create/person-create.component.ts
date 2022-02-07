import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CityService } from 'src/app/city/city.service';
import { PersonService } from '../person.service';
import { StateService } from 'src/app/state/state.service';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Person } from 'src/app/_model/person';
import { City } from 'src/app/_model/city';
import { State } from 'src/app/_model/state';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  cities: any[] = [];

  states: any[] = [];

  state!: number; // Selected State ID on P-Dropdown

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private personService: PersonService,
    private stateService: StateService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {

    this.initVariables();
  }

  get isEditing() {

    return Boolean(this.form.get('id')!.value);
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  onSubmit() {

    if (this.isEditing)

      this.update();

    else

      this.save();
  }

  reset() {

    this.form.reset();
  }

  save() {

    const person = this.form.value;

    this.personService.save(person).then((person: Person) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa salva na base de dados!', icon: 'pi-check-circle' });

      this.router.navigate(['/persons/edit', person.id]);

    }).catch(error => this.errorHandler.handle(error));
  }

  update() {

    const person = this.form.value;

    this.personService.update(person).then((person: Person) => {

      const contacts = this.f['contacts'] as FormArray;

      contacts.clear();

      person.contacts.forEach(() => {

        contacts.push(this.createContactsFormgroup());
      });

      this.form.patchValue(person);

      this.titleUpdate();

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa alterada na base de dados!', icon: 'pi-check-circle' });

    }).catch(error => this.errorHandler.handle(error));
  }

  loadPerson(id: number) {

    this.personService.findById(id).then((person: Person) => {

      const contacts = this.f['contacts'] as FormArray;

      person.contacts.forEach(() => {

        contacts.push(this.createContactsFormgroup());
      });

      this.form.patchValue(person);

      this.titleUpdate();

      // RELOAD PERSISTED CITY

      this.state = this.f['address'].get('city') ? this.f['address'].get('city.state.id')?.value : undefined;

      if (this.state)

        this.loadCities();

    }).catch(error => this.errorHandler.handle(error));
  }

  loadStates() {

    return this.stateService.findAll().then(states => {

      this.states = states.map((s: State) => ({ label: s.name, value: s.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  loadCities() {

    const state = this.f['address'].get('city.state.id')?.value;

    return this.cityService.findByStateId(state).then(cities => {

      this.f['address'].get('city.id')?.enable();

      if (this.state !== this.f['address'].get('city.state.id')?.value)

        this.f['address'].get('city.id')?.reset();

      this.cities = cities.map((c: City) => ({ label: c.name, value: c.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  new() {

    this.reset();

    this.router.navigate(['persons/create']);
  }

  private titleUpdate() {

    this.title.setTitle(`Editar Pessoa: ${ this.form.get('name')?.value }`);
  }

  private initVariables() {

    this.title.setTitle('Nova Pessoa');

    const id = this.route.snapshot.params['id'];

    this.initForm();

    this.loadStates();

    if (id)

      this.loadPerson(id);
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
          id: [ { value: null, disabled: true }, [ Validators.required ] ],
          state: this.formBuilder.group({
            id: [ null, [ Validators.required ] ]
          })
        })
      }),

      contacts: this.formBuilder.array([]),

      status: [ true ]
    });
  }

  private createContactsFormgroup(): FormGroup {

    return this.formBuilder.group({

      id: [],
      name: [ null, [ Validators.required, Validators.minLength(5) ] ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phone: [ null, Validators.required ]
    });
  }
}
