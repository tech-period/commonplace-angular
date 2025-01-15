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
