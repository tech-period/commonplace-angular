import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AbstractRow } from '../../models/table/abstract-row';
import { ColumnDef } from '../../models/table/column-def';

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
  columnDefs: ColumnDef[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rows']?.currentValue.length > 0) {
      const rows = changes['rows'].currentValue;
      this.dataSource.data = rows;
      this.columnDefs = rows[0].getColumnDefs();
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
    if(!this.rows) return;

    if(this.pageSize() != event.pageSize) {
      this.pageSize.update(() => event.pageSize);
      this.dataSource.data = this.rows.slice(0, event.pageSize);
    } else {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      const rowData = this.rows.slice(startIndex, endIndex);
      this.dataSource.data = rowData;
    }
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
