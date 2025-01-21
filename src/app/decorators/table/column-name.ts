/**
 * 受け取った値とプロパティの名前をセットにして列定義として保持するデコレータ
 * @param name 表示する列名の値
 * @returns 
 */
export function ColumnName(value:string) {
  return function(target: any, key: string) {
    if (!target.constructor.columnDefs) {
      target.constructor.columnDefs = [];
    }
    target.constructor.columnDefs.push({key, value});
  }
}
