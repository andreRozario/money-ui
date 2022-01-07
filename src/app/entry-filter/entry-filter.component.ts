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
    { type: 'DESPESA', description: 'Compra de pão', dueDate: '30/01/2022',
      paymentDate: null, value: 4.55, person: 'Padaria do José' },
    { type: 'RECEITA', description: 'Venda de software', dueDate: '10/01/2022',
      paymentDate: '09/01/2022', value: 80000, person: 'Atacado Brasil' },
    { type: 'DESPESA', description: 'Impostos', dueDate: '20/02/2022',
      paymentDate: null, value: 14312, person: 'Ministério da Fazenda' },
    { type: 'DESPESA', description: 'Mensalidade de escola', dueDate: '05/01/2022',
      paymentDate: '30/05/2022', value: 800, person: 'Escola Abelha Rainha' },
    { type: 'RECEITA', description: 'Venda de carro', dueDate: '18/08/2022',
      paymentDate: null, value: 55000, person: 'Sebastião Souza' },
    { type: 'DESPESA', description: 'Aluguel', dueDate: '10/02/2022',
      paymentDate: '09/02/2022', value: 1750, person: 'Casa Nova Imóveis' },
    { type: 'DESPESA', description: 'Mensalidade musculação', dueDate: '13/02/2022',
      paymentDate: null, value: 180, person: 'Academia Top' }
  );

}
