import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/_model/user';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  display = false;

  items: MenuItem[] = [];

  user = new User();

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user.name = this.auth.payload?.name;

    this.items = [
      {
        label: 'Dashboard',
        items: []
      },
      {
        label: 'Lançamentos',
        items: []
      },
      {
        label: 'Pessoas',
        items: []
      },
      {
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];

    // DASHBOARD

    this.accessVerification('SHOW_ENTRY', 0, 'Visualizar', 'pi pi-chart-bar', ['/dashboard']);

    // ENTRY

    this.accessVerification('SHOW_ENTRY', 1, 'Listar', 'pi pi-align-left', ['/entries']);

    this.accessVerification('SAVE_ENTRY', 1, 'Adicionar', 'pi pi-plus', ['/entries/create']);

    // PERSON

    this.accessVerification('SHOW_PERSON', 2, 'Listar', 'pi pi-align-left', ['/persons']);

    this.accessVerification('SAVE_PERSON', 2, 'Adicionar', 'pi pi-plus', ['/persons/create']);
  }

  logout() {

    this.auth.logout().then(() => {

      this.router.navigate(['/login']);

    }).catch(error => this.errorHandler.handle(error));
  }

  private accessVerification(permission: string, i: number, label: string, icon: string, routerLink: Array<any>) {

    if (this.auth.hasAuthority(permission))

      this.items[i].items?.push({
        label: label,
        icon: icon,
        routerLink: routerLink,
        routerLinkActiveOptions: { exact: true }
      });
  }
}
