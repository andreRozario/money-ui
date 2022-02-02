import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;

  lineChartData: any;

  options = {

    plugins: {

      tooltip: {

        callbacks: {

          label: (context: any) => {

            const label = context.dataset.label ? `${context.dataset.label}: ` : '';
            const value = context.dataset.data[context.dataIndex];

            return label + this.decimalPipe.transform(value, '1.2-2');
          }
        }
      }
    }
  };

  constructor(
    private decimalPipe: DecimalPipe,
    private errorHandler: ErrorHandlerService,
    private service: DashboardService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Dashboard');

    this.countByCategory();

    this.countTypeByDay();
  }

  countByCategory(): void {

    const backgroundColor: Array<string> = [];

    this.service.countByCategory().then(dataset => {

      for(let i = 0; i < dataset.length; i = i + 1 )

        backgroundColor.push(this.randomColor('rgba')!);

      this.pieChartData = {

        labels: dataset.map(data => data.category.name),

        datasets: [
          {
            data: dataset.map(data => data.total),
            backgroundColor: backgroundColor
          }
        ]
      };

    }).catch(error => this.errorHandler.handle(error));
  }

  countTypeByDay(): void {

    this.service.countTypeByDay().then((dataset: Array<any>) => {

      console.log(dataset);

      const dates = this.dateConfig();
      const incomes = this.totalByEachDate(dataset.filter(data => data.type === 'RECEITA'), dates);
      const outcomes = this.totalByEachDate(dataset.filter(data => data.type === 'DESPESA'), dates);

      this.lineChartData = {

        labels: dates,

        datasets: [
          {
            label: 'Receitas',
            data: incomes,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: outcomes,
            borderColor: '#D62B00'
          }
        ]
      }

    }).catch(error => this.errorHandler.handle(error));
  }

  private totalByEachDate(dataset: Array<any>, dates: Array<any>): Array<number> {

    const total: number[] = [];

    for (const date of dates) {

      let t = 0;

      for (const data of dataset) {

        if (data.date.getDate() === date) {

          t = data.total;

          break;
        }
      }

      total.push(t);
    }

    return total;
  }

  private dateConfig(): Array<number> {

    const actualMonth = new Date();

    actualMonth.setMonth(actualMonth.getMonth() + 1);
    actualMonth.setDate(0);

    const quantity = actualMonth.getDate();

    const days: number[] = [];

    for (let i = 1; i <= quantity; i++)

      days.push(i);

    return days;
  }

  private randomColor(type: string): string | null {

    switch (type) {

      case 'rgba':

          const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
          const byte   = ()                         => random(0, 255);
          const alfa   = ()                         => (random(50, 50) * 0.01).toFixed(2);

        return `rgba(${ [ byte(), byte(), byte(), alfa() ].join(',') })`;

      case 'hexadecimal':

        var hexadecimals = '0123456789ABCDEF';

        var color = '#';

        for (var i = 0; i < 6; i++ )

          color += hexadecimals[ Math.floor(Math.random() * 16) ];

        return color;

      default:

        return null;
    }
  }
}
