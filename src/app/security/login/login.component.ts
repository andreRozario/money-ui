import { Component, OnInit, ViewChild } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @ViewChild('password') password: any;

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {

    this.title.setTitle('Login');

    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  onSubmit() {

      this.login(this.f['username'].value, this.f['password'].value);
  }

  reset() {

    this.f['password'].setValue('');

    this.password.nativeElement.focus();
  }

  login(username: string, password: string) {

    this.auth.login(username, password).then(() => {

      this.router.navigate(['/entries']);

    }).catch(error => {

      this.reset();

      this.errorHandler.handle(error);
    });
  }

  private initForm() {

    this.form = this.formBuilder.group({

      username: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, Validators.required ]
    });
  }
}
