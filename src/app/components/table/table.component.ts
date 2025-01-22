import { Component, Input, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort, SortDirection } from '@angular/material/sort';
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

  @ViewChild(MatSort) sortSetting: MatSort | undefined;

  @Input() rows?: T[];

  rowLength = signal(0);
  pageSizeOptions = signal([5, 10, 25, 100]);
  pageSize = signal(this.pageSizeOptions()[0]);
  columns: string[] = [];
  columnDefs: ColumnDef[] = [];
  dataSource = new MatTableDataSource<any>([]);

  isDisableSortHeader: boolean = true;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    const hasRows = changes['rows']?.currentValue.length > 0;

    if(hasRows) {
      const rows = changes['rows'].currentValue;
      this.dataSource.data = rows;
      this.columnDefs = rows[0].getColumnDefs();
      this.columns = this.columnDefs.map(d => d.key);
      this.rowLength.update(() => rows.length);
    }
    this.isDisableSortHeader = !hasRows;
    this.resetSort();
  }

  onSortChange(event: Sort): void {
    if(!this.rows) return;

    if (event.active && event.direction !== '') {
      const sortedData = this.rows.sort((a:any, b:any) => {
        const isAsc: boolean = (event.direction === ('asc' as SortDirection));
        return (a[event.active] < b[event.active] ? -1 : 1) * (isAsc ? 1 : -1);
      });
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    } else {
      const sortedData = this.rows.sort((a, b) => a.index < b.index ? -1 : 1);
      this.dataSource.data = sortedData.slice(0, this.pageSize());
    }
  }

  onPageChange(event: PageEvent): void {
    if(!this.rows) return;

    if(this.pageSize() != event.pageSize) {
      this.pageSize.update(() => event.pageSize);
      this.dataSource.data = this.rows.slice(0, event.pageSize);
      this.resetSort();
    } else {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      const rowData = this.rows.slice(startIndex, endIndex);
      this.dataSource.data = rowData;
    }
  }

  private resetSort(): void {
    if(!this.sortSetting) return;
    this.sortSetting.active = '';
    this.sortSetting.direction = '';
    this.sortSetting.sortChange.emit({ active: '', direction: '' });
  }
}
