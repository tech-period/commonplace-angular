export function ColumnName(name:string) {
  return function(target: any, key: string) {
    if (!target.constructor.columnNames) {
      target.constructor.columnNames = new Map<string, string>();
    }
    target.constructor.columnNames.set(key, name);
  }
}
