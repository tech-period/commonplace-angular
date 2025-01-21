import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SampleRow } from '../../models/table/sample-row';
import { AbstractRow } from '../../models/table/abstract-row';

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
export class TableComponent<T extends AbstractRow> {

  @Input() rows?: T[];

  rowLength = signal(0);
  pageSizeOptions = signal([5, 10, 25, 100]);
  pageSize = signal(this.pageSizeOptions()[0]);
  columns: string[] = [];
  columnDefs: { key: string, value: string }[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rows']?.currentValue.length > 0) {
      const rows = changes['rows'].currentValue;
      this.dataSource.data = rows;
      this.setColumnDefs(rows[0].constructor as typeof AbstractRow);
      this.columns = this.columnDefs.map(d => d.key);
      this.rowLength.update(() => rows.length);
    }
  }

  onSortChange(event: Sort): void {
    if(!this.rows) {
      this.dataSource.data = [];
      return;
    };

    if (event.active && event.direction !== '') {
      const sortedData = this.rows.sort((a:any, b:any) => {
        const isAsc: boolean = (event.direction === ('asc' as SortDirection));
        return this.compare(a[event.active], b[event.active], isAsc);
      });
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    } else {
      const sortedData = this.rows.sort((a:any, b:any) => {
        return this.compare(a.id, b.id, true);
      });
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    }
  }

  onPageChange(event: PageEvent): void {
    if(!this.rows) {
      this.dataSource.data = [];
      return;
    }

    this.pageSize.update(() => event.pageSize);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const rawrowData = this.rows.map((data:any) => {
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

  private setColumnDefs(rowConstructor: typeof AbstractRow): void {
    this.columnDefs = Array.from(
      rowConstructor.getColumnDefs(),
      ([key, value]) => ({ key, value })
    );
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
