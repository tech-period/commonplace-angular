import { Component, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SampleRow } from '../../models/table/sample-row';
import { getColumnDefs } from '../../decorators/table';

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
  rowLength = signal(0);
  pageSizeOptions = signal([2, 5, 10, 25, 100]);
  pageSize = signal(this.pageSizeOptions()[0]);
  columns: string[] = [
    'id',
    'sample1',
    'sample2',
    'sample3',
  ];
  columnDefs: { key: string, value: string }[];
  dataSource = new MatTableDataSource<any>([]);
  private rawData = [
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


  constructor() {
    this.dataSource.data = this.rawData.map((data) => {
      return new SampleRow(
        data.id.toString(),
        data.sample1,
        data.sample2,
        data.sample3,
        new Date(),
      );
    }).slice(0, this.pageSize());
    this.rowLength.update(() => this.rawData.length);
    this.columnDefs = Array.from(
      getColumnDefs(SampleRow),
      ([key, value]) => ({ key, value })
    );
    this.columns = this.columnDefs.map(d => d.key);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.update(() => event.pageSize);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const rawrowData = this.rawData.map((data) => {
      return new SampleRow(
        data.id.toString(),
        data.sample1,
        data.sample2,
        data.sample3,
        new Date(),
      );
    });
    const rowData = rawrowData.slice(startIndex, endIndex);
    this.dataSource.data = rowData;
    console.log(event);
  }
}
