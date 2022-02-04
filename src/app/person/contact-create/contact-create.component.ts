import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Contact } from 'src/app/_model/contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Input() parent!: FormGroup;

  @Input() index!: number;

  @Output() onAddContact = new EventEmitter();

  @Output() onConfirmContact = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.initForm();

    this.addContactEmmiter(this.form);

    // this.form.get('phone')?.valueChanges.subscribe(value => {

    //   if(value.length > 10)

    //     this.mask='(00) 00000-0000';

    //    else

    //     this.mask= '(00) 0000-0000';
    // });
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

  confirmContact() {

    const contact = this.form.value;

    // this.parent.value.contacts.push(this.clone(contact));

    this.parent.value.contacts[this.index!] = this.clone(contact);

    this.form.reset();
  }

  clone(contact: Contact): Contact {

    return new Contact(contact.id, contact.name, contact.email, contact.phone);
  }

  addContactEmmiter(form: any): void {

    this.onAddContact.emit(form);
  }

  confirmContactEmmiter(display: any): void {

    this.onConfirmContact.emit(display);
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
