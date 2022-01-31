import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden-access',
  template: `
    <div class="container">
      <h1 class="text-center">ATENÇÃO!</h1>
      <h2 class="text-center text-bluegray-200">Acesso Negado</h2>
      <div class="text-center text-yellow-500">
        <i class="pi pi-exclamation-circle" style="font-size: 6rem"></i>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ForbiddenAccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
