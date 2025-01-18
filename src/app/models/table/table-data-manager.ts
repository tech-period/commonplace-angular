import { getColumnDefs } from "../../decorators/table";
import { AbstractRow } from "./abstract-row";

export class TableDataManager<T extends AbstractRow> {

  columnDefs: { key: string, value: string }[];

  private pageSizeOptions: number[] = [5, 10, 25, 100];
  private rows: T[] = [];

  constructor(
    rowConstructor: { new(...args: any[]): T },
    rows: T[]
  ) {
    this.columnDefs = Array.from(
      getColumnDefs(rowConstructor),
      ([key, value]) => ({ key, value })
    );
    this.rows = rows;
  }
}
