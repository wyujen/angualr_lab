import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect
} from '@angular/core';
import Sortable from 'sortablejs';
import { SharedModule } from '../../../../shared.module';
import { CourseSortService } from '../../service/course-sort.service';

@Component({
  selector: 'app-sort-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sort-list.component.html',
  styleUrl: './sort-list.component.scss'
})
export class SortListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sortableList', { static: false }) sortableList?: ElementRef<HTMLElement>;

  items: any[] = [];
  trackById = (_: number, item: any) => item.id;

  private sortable?: Sortable;

  constructor(public sortS: CourseSortService) {
    // 初始值
    this.items = this.sortS.sortS();

    // 監聽 signal 更新
    effect(() => {
      const data = this.sortS.sortS();
      const ids = data.map(x => x?.id);
      const dup = ids.filter((id, i) => ids.indexOf(id) !== i);

      console.log('items order', ids);
      if (dup.length) console.warn('Duplicate ids:', dup);

      this.items = data;
    });
  }

  ngAfterViewInit() {
    if (!this.sortableList) return;

    const listElement = this.sortableList.nativeElement;

    this.sortable = Sortable.create(listElement, {
      animation: 150,

      // 只允許拖曳把手（你畫面上的 ☰）
      handle: '.drag-handle',

      // 防止文字選取干擾拖曳
      preventOnFilter: true,

      onEnd: (event) => {
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;

        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
        if (oldIndex === newIndex) return;

        // 一定要複製出新陣列（避免改到同一個 reference，signal 不觸發）
        const next = [...this.items];
        const [moved] = next.splice(oldIndex, 1);
        next.splice(newIndex, 0, moved);

        this.sortS.setAll(next);
      }
    });
  }

  clear() {
    this.sortS.setAll([]);
  }

  ngOnDestroy(): void {
    // 記得 destroy sortable，避免 memory leak
    this.sortable?.destroy();
  }
}
