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
  @ViewChild('sortableList', { static: false })
  sortableList?: ElementRef<HTMLElement>;

  items: any[] = [];

  private sortable?: Sortable;

  constructor(public sortS: CourseSortService) {
    // 初始值
    this.items = this.sortS.sortS();

    // ✅ 每次 service 的 signal 變更 -> 更新 items
    // ✅ 並在 render 後強制把 DOM 依 items 順序排回來（修 4123）
    effect(() => {
      const data = this.sortS.sortS();
      this.items = data;

      queueMicrotask(() => {
        const order = this.items.map(x => x.id); // id 是 string
        this.sortable?.sort(order);
      });
    });
  }

  ngAfterViewInit(): void {
    if (!this.sortableList) return;

    const listEl = this.sortableList.nativeElement;

    this.sortable = Sortable.create(listEl, {
      animation: 150,
      handle: '.drag-handle',

      // ✅ 讓 sortable.sort(order) 依照 <li data-id="..."> 進行排序
      dataIdAttr: 'data-id',

      onEnd: (event) => {
        console.log('eventtttttt', event)
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;

        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
        if (oldIndex === newIndex) return;

        // ✅ 拖曳時：用資料做 reorder（immutable）
        const next = [...this.items];
        const [moved] = next.splice(oldIndex, 1);
        next.splice(newIndex, 0, moved);

        // 更新回 service（會觸發 effect -> 也會自動 sort DOM）
        this.sortS.setAll(next);
      }
    });

    
    // queueMicrotask(() => {
    //   const order = this.items.map(x => x.id);
    //   this.sortable?.sort(order);
    // });
  }

  clear(): void {
    this.sortS.setAll([]);
    queueMicrotask(() => this.sortable?.sort([]));
  }

  ngOnDestroy(): void {
    this.sortable?.destroy();
  }
}
