import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Contact } from 'src/app/_model/contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  display: boolean = false;

  index!: number;

  @Input() parent!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  onSubmit() {

    this.confirmContact();
  }

  reset() {

    this.form.reset();
  }

  addContact() {

    this.form.reset();

    this.display = true;

    this.index = this.parent.get('contacts')!.value.length;
  }

  confirmContact() {

    const contact = this.form.value;

    this.parent.get('contacts')!.value[this.index!] = this.clone(contact);

    this.display = false;

    this.form.reset();
  }

  editContact(contact: Contact, index: number) {

    this.parent.get('contacts')!.value[index] = this.clone(contact);

    this.form.setValue(this.clone(contact));

    this.display = true;

    this.index = index;
  }

  removeContact(index: number) {

    this.parent.get('contacts')!.value.splice(index, 1);
  }

  clone(contact: Contact): Contact {

    return new Contact(contact.id, contact.name, contact.email, contact.phone);
  }

  private initForm() {

    this.form = this.formBuilder.group({

      id: [],
      name: [ null, [ Validators.required, Validators.minLength(5) ] ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phone: [ null, Validators.required ]
    });
  }
}
