import { ColumnDef } from "./column-def";

export abstract class AbstractRow {

  static columnDefs: ColumnDef[];

  id: string;
  createDateTime: Date;
  updateDateTime: Date | null;
  deleteDateTime: Date | null;

  constructor(
    id: string,
    createDateTime: Date,
    updateDateTime: Date | null = null,
    deleteDateTime: Date | null = null,
  ) {
    this.id = id;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
    this.deleteDateTime = deleteDateTime;
  }

  /**
   * `@ColumnName`Decoratorで指定された列の定義を取得する
   * @returns ColumnDef[]
   */
  static getColumnDefs(): ColumnDef[] {
    return this.columnDefs ?? [];
  }
}
