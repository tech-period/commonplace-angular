import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { AbstractRow } from '../../models/table/abstract-row';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColumnName } from '../../decorators/table';

describe('TableComponent', () => {
  let component: TableComponent<TestRow>;
  let fixture: ComponentFixture<TableComponent<TestRow>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TableComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent<TestRow>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class TestRow extends AbstractRow {
  @ColumnName('社員コード') employeeCode: number;
  @ColumnName('担当者名') managerName: string;
  @ColumnName('期限') deadline: Date;
  @ColumnName('提出') isSubmitted: boolean;
  @ColumnName('提出日') submitDate: Date | null;
  @ColumnName('評点') score: number | null;
  @ColumnName('評価') rating: string | null;
  @ColumnName('合否') isPassed: boolean | null;

  constructor(
    index: number,
    id: string,
    employeeCode: number,
    managerName: string,
    isSbmitted: boolean,
    submitDate: Date | null,
    score: number | null,
    rating: string | null,
    isPassed: boolean | null,
    deadline: Date,
    createdAt: Date,
    updateDateTime: Date | null = null,
    deleteDateTime: Date | null = null,
  ) {
    super(
      index,
      id,
      createdAt,
      updateDateTime,
      deleteDateTime
    );
    this.employeeCode = employeeCode;
    this.managerName = managerName;
    this.isSubmitted = isSbmitted;
    this.submitDate = submitDate;
    this.score = score;
    this.rating = rating;
    this.isPassed = isPassed;
    this.deadline = deadline;
  }
}