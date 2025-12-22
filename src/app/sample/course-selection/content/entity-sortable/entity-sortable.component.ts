import { AfterViewInit, Component, effect, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import Sortable from 'sortablejs';
import { EntitySortableUiService } from './entity-sortable-ui.service';

@Component({
  selector: 'app-entity-sortable',
  imports: [
    SharedModule
  ],
  templateUrl: './entity-sortable.component.html',
  styleUrl: './entity-sortable.component.scss'
})
export class EntitySortableComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('sortableVC', { static: false })
  sortabVC?: ElementRef<HTMLElement>;
  private sortable?: Sortable;

  constructor(
    public sortUiS: EntitySortableUiService
  ) {
    effect(() => {
      const order = this.sortUiS.entitysSortS().map(entity => entity.id)
      queueMicrotask(() => {
        this.sortable?.sort(order)
      })
    })
  }
  ngOnInit(): void {
    // data init input

    // this.http.get().subscrib((data)=>{
    //   this.sortUiS.reload(data)
    // })
  }

  ngAfterViewInit(): void {
    if (!this.sortabVC) return
    const listEl = this.sortabVC.nativeElement;

    this.sortable = Sortable.create(listEl, {
      animation: 150,
      handle: '.drag-handle',
      dataIdAttr: 'data-id',
      onEnd: (event) => {
        const oldIndex = event.oldIndex
        const newIndex = event.newIndex

        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
        if (oldIndex === newIndex) return;

        this.sortUiS.updateSort(oldIndex, newIndex)
      }
    })

  }
  clear() {
    this.sortUiS.clear()
  }
  remove(id: string) {
    this.sortUiS.remove(id)
  }
  submit() {
    console.log('submit :', this.sortUiS.entitysSortS())
  }

  ngOnDestroy(): void {
    this.sortable?.destroy();
  }
}
