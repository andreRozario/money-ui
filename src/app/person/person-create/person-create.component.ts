import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class Person {

  name: string = '';
  location: string = '';
  number: string = '';
  complement: string = '';
  district: string = '';
  zipcode: string = '';
  city: any = undefined;
  state: any = undefined;
}

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  person: Person = new Person();

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.initForm();
  }

  get name(): any {

    return this.form.get('name');
  }

  get location(): any {

    return this.form.get('location');
  }

  get number(): any {

    return this.form.get('number');
  }

  get complement(): any {

    return this.form.get('complement');
  }

  get district(): any {

    return this.form.get('district');
  }

  get zipcode(): any {

    return this.form.get('zipcode');
  }

  get city(): any {

    return this.form.get('city');
  }

  get state(): any {

    return this.form.get('state');
  }

  onSubmit() {

    console.warn(this.form.value);

    this.reset();
  }

  fullUpdate() {
  }

  reset() {

    this.form.reset({
      name: ''
    });
  }

  private initForm() {

    this.form = this.formBuilder.group({
      name: [ this.person.name, [ Validators.required, Validators.minLength(5) ] ],
      location: [ this.person.location, Validators.required ],
      number: [ this.person.number, Validators.required ],
      complement: [ this.person.complement, null ],
      district: [ this.person.district, [ Validators.required ] ],
      zipcode: [ this.person.zipcode, [ Validators.required ] ],
      city: [ this.person.city, [ Validators.required ] ],
      state: [ this.person.state, Validators.required ]
    });
  }
}
