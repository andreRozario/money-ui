import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  display = false;

  items: MenuItem[] = [];

  user = new User();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    this.user.name = this.auth.payload?.name;

    this.items = [
      {
        label: 'Lançamentos',
        items: []
      },
      {
        label: 'Pessoas',
        items: []
      }
    ];

    // ENTRY

    this.accessVerification('SHOW_ENTRY', 0, 'Listar', 'pi pi-align-left', ['/entries']);

    this.accessVerification('SAVE_ENTRY', 0, 'Adicionar', 'pi pi-plus', ['/entries/create']);

    // PERSON

    this.accessVerification('SHOW_PERSON', 1, 'Listar', 'pi pi-align-left', ['/persons']);

    this.accessVerification('SAVE_PERSON', 1, 'Adicionar', 'pi pi-plus', ['/persons/create']);
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
