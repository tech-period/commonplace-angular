import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { configureTestBed } from '../../app.config';
import { TableComponent } from './table.component';
import { AbstractRow } from '../../models/table/abstract-row';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColumnName } from '../../decorators/table';

describe('TableComponent', () => {
  let hostComponent: TestHostComponent;
  let testTargetComponent: TableComponent<TestRow>;
  let fixture: ComponentFixture<TestHostComponent>;
  
  beforeEach(async () => {
    configureTestBed();
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TableComponent,
        TestHostComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    testTargetComponent = hostComponent.testTargetComponent;
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should setup test data', () => {
    const testRows = getTestData();
    hostComponent.valueFromHost = testRows;
    fixture.detectChanges();
    expect(testTargetComponent.dataSource.data.length).toBe(3);
  });
});

function getTestData(): TestRow[] {
  return [
    new TestRow(1, 'A101', 3, 'test1', true, new Date(), 80, 'A', true, new Date(), new Date()),
    new TestRow(2, 'A102', 2, 'test2', false, null, null, null, null, new Date(), new Date()),
    new TestRow(3, 'A103', 1, 'test3', true, new Date(), 60, 'B', false, new Date(), new Date()),
  ]
}

@Component({
  template : `<app-table [rows]="valueFromHost"/>`,
  imports : [TableComponent]
})
export class TestHostComponent {
  @ViewChild(TableComponent) public testTargetComponent: any;
  valueFromHost: TestRow[] = [];
}

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