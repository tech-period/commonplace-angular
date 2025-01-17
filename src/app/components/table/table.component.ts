import { Component, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
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
  pageSizeOptions = signal([5, 10, 25, 100]);
  pageSize = signal(this.pageSizeOptions()[0]);
  columns: string[] = [
    'id',
    'sample1',
    'sample2',
    'sample3',
  ];
  columnDefs: { key: string, value: string }[];
  dataSource = new MatTableDataSource<any>([]);
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
    this.dataSource.data = this.rawData.map((data:any) => {
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

  onSortChange(event: Sort): void {
    if (event.active && event.direction !== '') {
      const sortedData = this.rawData.sort((a:any, b:any) => {
        const isAsc: boolean = (event.direction === ('asc' as SortDirection));
        return this.compare(a[event.active], b[event.active], isAsc);
      });
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    } else {
      const sortedData = this.rawData.sort((a:any, b:any) => {
        return this.compare(a.id, b.id, true);
      });
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.update(() => event.pageSize);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const rawrowData = this.rawData.map((data:any) => {
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

  private updateDisplay(): void {
    // ソートの指定に応じてソート
    // ページングの指定に応じて対応するデータを取得
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
