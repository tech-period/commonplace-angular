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

  it('should sort by score', () => {
    const testRows = getTestData();
    hostComponent.valueFromHost = testRows;
    testTargetComponent.onSortChange({ active: 'employeeCode', direction: 'asc' });
    // ソート処理の後にデータソースが更新されるのを待つ
    fixture.whenStable().then(() => {
      fixture.detectChanges();  // UI更新の反映
      expect(testTargetComponent.dataSource.data[0].score).toBeNull();
    });
  });

  it('should handle pagination correctly', () => {
    const testRows = getTestDataForPagination();
    hostComponent.valueFromHost = testRows;
    fixture.detectChanges();
  
    // 初期状態の確認（デフォルトのページサイズは20）
    expect(testTargetComponent.dataSource.data.length).toBe(20);
    expect(testTargetComponent.dataSource.data[0].employeeCode).toBe(1); // 1ページ目の最初のデータ
  
    // 2ページ目に移動
    testTargetComponent.onPageChange({
      pageIndex: 1,
      pageSize: 20,
      length: testRows.length
    });
    fixture.detectChanges();
  
    // 2ページ目のデータを確認（インデックス20から始まるため、employeeCodeは21）
    expect(testTargetComponent.dataSource.data[0].employeeCode).toBe(21);
  });
});

function getTestData(): TestRow[] {
  return [
    new TestRow(1, 'A101', 3, 'test1', true, new Date(), 80, 'A', true, new Date(), new Date()),
    new TestRow(2, 'A102', 2, 'test2', false, null, null, null, null, new Date(), new Date()),
    new TestRow(3, 'A103', 1, 'test3', true, new Date(), 60, 'B', false, new Date(), new Date()),
  ]
}

// ページネーションテスト用のデータ生成関数
function getTestDataForPagination(): TestRow[] {
  const rows: TestRow[] = [];
  // 100件のテストデータを生成
  for (let i = 0; i < 100; i++) {  // 1から始めるのではなく0から始める
    rows.push(
      new TestRow(
        i,                          // index
        `A${(i + 1).toString().padStart(3, '0')}`, // id
        i + 1,                     // employeeCode を1から始める
        `test${i + 1}`,           // managerName
        i % 2 === 0,              // isSubmitted
        new Date(),               // submitDate
        i % 100,                  // score
        ['A', 'B', 'C', 'D'][i % 4], // rating
        i % 3 === 0,              // isPassed
        new Date(),               // deadline
        new Date(),               // createdAt
      )
    );
  }
  return rows;
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