export abstract class AbstractRow {

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
}


export function ColumnName(name:string) {
  return function(target: any, key: string) {
    if (!target.constructor.columnNames) {
      target.constructor.columnNames = [];
    }
    target.constructor.columnNames.push(name);
  }
}

export function getColumnDefs<T>(constructor: { new(...args: any[]): T }): string[] {
  return (constructor as any).columnNames || [];
}
