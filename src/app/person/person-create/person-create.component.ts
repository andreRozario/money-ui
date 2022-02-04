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
import { Contact } from 'src/app/_model/contact';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  contact: FormGroup = new FormGroup({});

  index!: number; // Contacts FormArray Index

  cities: any[] = [];

  states: any[] = [];

  showContactForm = false;

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

    this.title.setTitle('Nova Pessoa');

    const id = this.route.snapshot.params['id'];

    if (id)

      this.loadPerson(id);

    this.initForm();

    this.loadCities();

    this.loadStates();
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

    this.personService.save(person).then((_response: Person) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa salva na base de dados!', icon: 'pi-check-circle' });

      this.reset();

    }).catch(error => this.errorHandler.handle(error));
  }

  update() {

    const person = this.form.value;

    // console.log(person);


    this.personService.update(person).then((person: Person) => {

      // this.f['contacts']!.value[this.index!] = this.contact.value[this.index!];

      // const contacts = this.f['contacts'] as FormArray;

      // person.contacts.forEach((element, index) => {

      //   console.log(index);

        // this.f['contacts']!.value[this.index!] = this.createContactsFormgroup();


        // contacts.push(this.createContactsFormgroup());
      // });

      // console.log(person);
      const contacts = this.f['contacts'] as FormArray;

      // person.contacts.forEach((contact, index) => {

      //   contacts!.value[index] = this.createContactsFormgroup();
      // });

      console.log(contacts.value);
      console.log(person);


      this.form.setValue(person);

      this.titleUpdate();

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa alterada na base de dados!', icon: 'pi-check-circle' });

    }).catch(error => this.errorHandler.handle(error));
  }

  addContact() {

    this.contact.reset();

    this.showContactForm = true;

    this.index = this.f['contacts']!.value.length;
  }

  editContact(contact: Contact, index: number) {

    this.f['contacts']!.value[index] = this.clone(contact);

    this.contact.setValue(this.clone(contact));

    this.showContactForm = true;

    this.index = index;
  }

  removeContact(index: number) {

    this.f['contacts']!.value.splice(index, 1);
  }

  resetContact(form: any) {

    this.contact = form;
  }

  confirmContact(display: any) { // onConfirmContact - EventEmitter

    this.showContactForm = display;
  }

  clone(contact: Contact): Contact {

    return new Contact(contact.id, contact.name, contact.email, contact.phone);
  }

  loadPerson(id: number) {

    this.personService.findById(id).then((person: Person) => {

      const contacts = this.f['contacts'] as FormArray;

      person.contacts.forEach(() => {

        contacts.push(this.createContactsFormgroup());
      });

      this.form.patchValue(person);

      this.titleUpdate();

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

  new() {

    this.reset();

    this.router.navigate(['persons/create']);
  }

  private titleUpdate() {

    this.title.setTitle(`Editar Pessoa: ${ this.form.get('name')?.value }`);
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
