import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  display = false;

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items = [{
      label: 'Lançamentos',
      items: [{
        label: 'Listar',
        icon: 'pi pi-align-left',
        routerLink: ['/entries'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Adicionar',
        icon: 'pi pi-plus',
        routerLink: ['/entries/create'],
        routerLinkActiveOptions: { exact: true }
      }
      ]},
      {
        label: 'Pessoas',
        items: [{
          label: 'Listar',
          icon: 'pi pi-align-left',
          routerLink: ['/persons'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Adicionar',
          icon: 'pi pi-plus',
          routerLink: ['/persons/create'],
          routerLinkActiveOptions: { exact: true }
        }
      ]}
    ];
  }
}
