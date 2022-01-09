import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-filter',
  templateUrl: './entry-filter.component.html',
  styleUrls: ['./entry-filter.component.css']
})
export class EntryFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  entries = Array(
    { type: 'DESPESA', description: 'Compra de pão', dueDate: new Date(2022, 0, 30),
      paymentDate: null, value: 4.55, person: 'Padaria do José' },
    { type: 'RECEITA', description: 'Venda de software', dueDate:  new Date(2022, 0, 10),
      paymentDate:  new Date(2022, 0, 9), value: 80000, person: 'Atacado Brasil' },
    { type: 'DESPESA', description: 'Impostos', dueDate:  new Date(2022, 1, 20),
      paymentDate: null, value: 14312, person: 'Ministério da Fazenda' },
    { type: 'DESPESA', description: 'Mensalidade de escola', dueDate:  new Date(2022, 0, 5),
      paymentDate:  new Date(2022, 4, 30), value: 800, person: 'Escola Abelha Rainha' },
    { type: 'RECEITA', description: 'Venda de carro', dueDate:  new Date(2022, 7, 18),
      paymentDate: null, value: 55000, person: 'Sebastião Souza' },
    { type: 'DESPESA', description: 'Aluguel', dueDate:  new Date(2022, 1, 10),
      paymentDate:  new Date(2022, 1, 9), value: 1750, person: 'Casa Nova Imóveis' },
    { type: 'DESPESA', description: 'Mensalidade musculação', dueDate:  new Date(2022, 1, 17),
      paymentDate: null, value: 180, person: 'Academia Top' }
  );

}
