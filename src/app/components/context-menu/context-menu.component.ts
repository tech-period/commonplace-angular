import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CdkMenuModule,
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  @Input() items: string[] = [];
  @Input() width: string = '100%';

  @Output() select = new EventEmitter();

  // コンポーネントの外側からの参照用
  @ViewChild('menu', { static: true }) menu!: TemplateRef<any>;

  onClickItem(item: string, event: Event): void {
    this.select.emit(item);
  }
}
