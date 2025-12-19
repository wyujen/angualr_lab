import { AfterViewInit, Component, ElementRef, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import Sortable from 'sortablejs';
import { SharedModule } from '../../shared.module';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort-table',
  imports: [
    SharedModule
  ],
  templateUrl: './sort-table.component.html',
  styleUrl: './sort-table.component.scss'
})
export class SortTableComponent implements AfterViewInit {
  form: FormGroup;
  @ViewChild('sortableList', { static: false }) sortableList: ElementRef | undefined;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      items: this.fb.array([]) // 初始數據
    });
    this.addItem('a')
    this.addItem('b')
    this.addItem('c')
    this.addItem('d')

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.sortableList) {
      const listElement = this.sortableList.nativeElement;

      Sortable.create(listElement, {
        animation: 150,
        onEnd: (event) => {
          if (typeof event.oldIndex === 'number' && typeof event.newIndex === 'number') {
            // 正確處理 FormArray 的排序
            const oldIndex = event.oldIndex;
            const newIndex = event.newIndex;

            // 1. 移除舊位置的項目
            const movedItem = this.items.at(oldIndex);

            // 2. 根據新順序重新構建 FormArray
            const currentItems = this.items.value;
            currentItems.splice(oldIndex, 1); // 移除舊項目
            currentItems.splice(newIndex, 0, movedItem.value); // 插入到新位置

            // 3. 更新 FormArray 的值
            this.items.clear(); // 清空現有項目
            currentItems.forEach((item: any) => {
              this.items.push(this.fb.group({ ...item }));
            });
          } else {
            console.error('Invalid indices:', event.oldIndex, event.newIndex);
          }
        }
      });
    }
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(name: string) {
    const group = this.fb.group({
      name: [name]
    })
    this.items.push(group);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value); // 提交表單數據
  }
  getItems() {
    console.log('form value', this.form.value.items)
  }
}
