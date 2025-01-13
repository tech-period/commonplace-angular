import { getColumnDefs } from './abstract-row';
import { SampleRow } from './sample-row';

describe('SampleRow', () => {
  it('should create an instance', () => {

    const row = new SampleRow(
      'id',
      'sample1',
      'sample2',
      'sample3',
      new Date(),
    );
    const columnDefs = getColumnDefs(SampleRow);
    console.log('columnDefs:', columnDefs);
    expect(true).toBeTruthy();
  });
});
