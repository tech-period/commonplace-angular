import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  dataSource = new MatTableDataSource<any>([]);

  constructor() {
    this.dataSource.data = [
      { id: 1, sample1: 'A', sample2: 'B', sample3: 'C' },
      { id: 2, sample1: 'D', sample2: 'E', sample3: 'F' },
      { id: 3, sample1: 'G', sample2: 'H', sample3: 'I' },
    ];
  }
}
