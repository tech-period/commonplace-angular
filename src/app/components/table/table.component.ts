import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SampleRow } from '../../models/table/sample-row';
import { getColumnDefs } from '../../models/table/abstract-row';

@Component({
  selector: 'app-table',
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  columns: string[] = [
    'id',
    'sample1',
    'sample2',
    'sample3',
  ];
  columnDefs: { key: string, value: string }[];
  dataSource = new MatTableDataSource<any>([]);
  rows: SampleRow[];

  constructor() {
    const rawData = [
      { id: 1, sample1: 'A', sample2: 'B', sample3: 'C' },
      { id: 2, sample1: 'D', sample2: 'E', sample3: 'F' },
      { id: 3, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 4, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 5, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 6, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 7, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 8, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 9, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 10, sample1: 'G', sample2: 'H', sample3: 'I' },
      { id: 11, sample1: 'G', sample2: 'H', sample3: 'I' },
    ];

    this.dataSource.data = rawData;

    this.rows = rawData.map((data) => {
      return new SampleRow(
        data.id.toString(),
        data.sample1,
        data.sample2,
        data.sample3,
        new Date(),
      );
    });
    const columnDefsMap = getColumnDefs(SampleRow);
    this.columnDefs = Array.from(columnDefsMap, ([key, value]) => ({ key, value }));
    console.log(this.columnDefs);
  }
}
