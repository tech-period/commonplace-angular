import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal, TemplateRef, ViewChild } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    ContextMenuComponent,
    MatIconModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() placeholder: string = 'placeholder';
  @Input() errorMessage: string = 'error occurred';
  @Input() width: string = '200px';
  @Input() disabled: boolean = false;

  @Output() select = new EventEmitter();

  @ViewChild('selecter', { static: true }) selecter!: ElementRef;
  menuWidth = signal<string>('');

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
  items: string[] = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ];
  displayText = signal<string>(this.placeholder);

  isOpened = signal<boolean>(false);
  isSelected = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.menuWidth.set(this.calcSelectWidth());
  }

  onItemSelected(event: string): void {
    this.isOpened.set(false);
    this.isSelected.set(true);
    this.displayText.set(event);
    this.select.emit(event);
  }

  onMenuOpened(): void {
    this.isOpened.set(true);
  }

  onMenuClosed(): void {
    this.isOpened.set(false);
  }

  /**
   * 画面サイズ変更時、アイテム一覧の幅を再計算する
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    console.log('onResize', event);
    this.menuWidth.set(this.calcSelectWidth());
  }

  private calcSelectWidth(): string {
    console.log('calcSelectWidth', this.selecter?.nativeElement.offsetWidth);
    return this.selecter?.nativeElement.offsetWidth + 'px';
  }
}
