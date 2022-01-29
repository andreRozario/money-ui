import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <h1 class="text-center">ATENÇÃO!</h1>
      <h2 class="text-center text-bluegray-200">Página não encontrada</h2>
      <div class="text-center text-yellow-500">
        <i class="pi pi-exclamation-circle" style="font-size: 6rem"></i>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
