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
          icon: 'pi pi-list',
          command: () => {
              this.update();
          }
      },
      {
          label: 'Adicionar',
          icon: 'pi pi-plus',
          command: () => {
              this.delete();
          }
      }
      ]},
      {
          label: 'Pessoas',
          items: [{
              label: 'Listar',
              icon: 'pi pi-list',
              url: 'http://angular.io'
          },
          {
              label: 'Adicionar',
              icon: 'pi pi-plus',
              url: 'http://angular.io'
          }
      ]}
    ];
  }

  update() {

  }

  delete() {

  }
}
