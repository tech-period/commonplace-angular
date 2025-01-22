import { ColumnName } from "../../decorators/table";
import { AbstractRow } from "./abstract-row";

export class SampleRow extends AbstractRow {

  @ColumnName('ID')
  override id: string;
  @ColumnName('SAMPLE1')
  sample1: string;
  @ColumnName('SAMPLE2')
  sample2: string;
  @ColumnName('SAMPLE3')
  sample3: string;

  constructor(
    index: number,
    id: string,
    sample1: string,
    sample2: string,
    sample3: string,
    createDateTime: Date,
    updateDateTime: Date | null = null,
    deleteDateTime: Date | null = null,
  ) {
    super(index, id, createDateTime, updateDateTime, deleteDateTime);
    this.id = id;
    this.sample1 = sample1;
    this.sample2 = sample2;
    this.sample3 = sample3;
  }
}

