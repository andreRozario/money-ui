import { Component } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'money-ui';

  constructor(
    private config: PrimeNGConfig,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {

    this.translateService.setDefaultLang('pt');

    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  showNavbar() {

    return this.router.url !== '/login';
  }
}
