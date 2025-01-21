import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { SampleRow } from '../../models/table/sample-row';

@Component({
  selector: 'app-summary',
  imports: [
    TableComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  rows: SampleRow[] = [];

  private rawData:any = [
    { id: 1, sample1: 'A', sample2: 'B', sample3: 'C' },
    { id: 2, sample1: 'D', sample2: 'E', sample3: 'F' },
    { id: 3, sample1: 'G', sample2: 'H', sample3: 'I' },
    { id: 4, sample1: 'J', sample2: 'K', sample3: 'L' },
    { id: 5, sample1: 'M', sample2: 'N', sample3: 'O' },
    { id: 6, sample1: 'P', sample2: 'Q', sample3: 'R' },
    { id: 7, sample1: 'S', sample2: 'T', sample3: 'U' },
    { id: 8, sample1: 'V', sample2: 'W', sample3: 'X' },
    { id: 9, sample1: 'Y', sample2: 'Z', sample3: 'A' },
    { id: 10, sample1: 'B', sample2: 'C', sample3: 'D' },
    { id: 11, sample1: 'E', sample2: 'F', sample3: 'G' },
  ];

  constructor() {
    this.rows = this.rawData.map((data:any) => {
      return new SampleRow(
        data.id.toString(),
        data.sample1,
        data.sample2,
        data.sample3,
        new Date(),
      );
    });
  }
}
