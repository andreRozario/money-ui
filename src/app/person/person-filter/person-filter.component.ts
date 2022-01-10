import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-filter',
  templateUrl: './person-filter.component.html',
  styleUrls: ['./person-filter.component.css']
})
export class PersonFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  persons = [
    { name: 'Manoel Pinheiro', city: 'Uberlândia', state: 'MG', status: true },
    { name: 'Sebastião da Silva', city: 'São Paulo', state: 'SP', status: false },
    { name: 'Carla Souza', city: 'Florianópolis', state: 'SC', status: true },
    { name: 'Luís Pereira', city: 'Curitiba', state: 'PR', status: true },
    { name: 'Vilmar Andrade', city: 'Rio de Janeiro', state: 'RJ', status: false },
    { name: 'Paula Maria', city: 'Uberlândia', state: 'MG', status: true }
  ];
}
