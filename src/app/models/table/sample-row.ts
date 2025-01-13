import { AbstractRow, ColumnName } from "./abstract-row";

export class SampleRow extends AbstractRow {

  @ColumnName('Sample 111')
  sample1: string;
  @ColumnName('Sample 222')
  sample2: string;
  @ColumnName('Sample 333')
  sample3: string;

  constructor(
    id: string,
    sample1: string,
    sample2: string,
    sample3: string,
    createDateTime: Date,
    updateDateTime: Date | null = null,
    deleteDateTime: Date | null = null,
  ) {
    super(id, createDateTime, updateDateTime, deleteDateTime);
    this.sample1 = sample1;
    this.sample2 = sample2;
    this.sample3 = sample3;
  }
}

