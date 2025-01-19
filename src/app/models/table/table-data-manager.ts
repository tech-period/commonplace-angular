import { getColumnDefs } from "../../decorators/table";
import { AbstractRow } from "./abstract-row";

export class TableDataManager<T extends AbstractRow> {

  
  private _columnDefs: { key: string, value: string }[];
  private _pageSizeOptions: number[] = [5, 10, 25, 100];
  private _rows: T[] = [];

  constructor(
    rowConstructor: { new(...args: any[]): T },
    rows: T[]
  ) {
    this._columnDefs = Array.from(
      getColumnDefs(rowConstructor),
      ([key, value]) => ({ key, value })
    );
    this._rows = rows;
  }

  get rows(): T[] {
    return this._rows;
  }

  get columnDefs(): { key: string, value: string }[] {
    return this._columnDefs;
  }
}
