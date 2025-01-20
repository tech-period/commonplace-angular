export abstract class AbstractRow {

  static columnNames: Map<string, string>;

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
   * @returns Map<string, string>
   */
  static getColumnDefs(): Map<string, string> {
    return this.columnNames || new Map<string, string>();
  }
}
