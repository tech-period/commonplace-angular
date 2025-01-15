export function getColumnDefs<T>(constructor: { new(...args: any[]): T }): Map<string, string> {
  return (constructor as any).columnNames || new Map<string, string>();
}
