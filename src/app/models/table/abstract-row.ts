import { ColumnDef } from "./column-def";

export abstract class AbstractRow {

  static columnDefs: ColumnDef[];

  index: number;
  id: string;
  createDateTime: Date;
  updateDateTime: Date | null;
  deleteDateTime: Date | null;

  constructor(
    index: number,
    id: string,
    createDateTime: Date,
    updateDateTime: Date | null = null,
    deleteDateTime: Date | null = null,
  ) {
    this.index = index;
    this.id = id;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
    this.deleteDateTime = deleteDateTime;
  }

  /**
   * `@ColumnName`Decoratorで指定された列の定義を取得する
   * @returns ColumnDef[]
   */
  getColumnDefs(): ColumnDef[] {
    const constructor = this.constructor as typeof AbstractRow;
    return constructor.columnDefs ?? [];
  }
}
