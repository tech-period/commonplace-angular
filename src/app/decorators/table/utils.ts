import { AbstractRow } from "../../models/table/abstract-row";

export function getColumnDefs<T extends AbstractRow>(constructor: { new(...args: any[]): T }): Map<string, string> {
  return (constructor as any).columnNames || new Map<string, string>();
}
