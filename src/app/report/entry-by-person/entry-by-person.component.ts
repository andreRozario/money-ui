import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ReportService } from '../report.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-entry-by-person',
  templateUrl: './entry-by-person.component.html',
  styleUrls: ['./entry-by-person.component.css']
})
export class EntryByPersonComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {

    this.title.setTitle('Relatório de Lançamentos por Pessoa');

    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  onSubmit() {

    this.reportByPerson();
  }

  reset() {

    this.form.reset();
  }

  reportByPerson() {

    const filter = this.form.value;

    this.reportService.reportByPerson(filter).then((response: any) => {

      const url = window.URL.createObjectURL(response)

      window.open(url);

    }).catch(error => this.errorHandler.handle(error));
  }

  private initForm() {

    this.form = this.formBuilder.group({
      initialDate: [ null, Validators.required ],
      finalDate:  [ null, Validators.required ]
    });
  }
}
