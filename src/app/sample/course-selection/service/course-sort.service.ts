import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CourseSortService {
  private _sortCourseList = signal<any[]>([]);
  sortS = this._sortCourseList.asReadonly();

  constructor() {
    effect(() => {
      const sort = this.sortS()
      console.log(this.sortS())
    })

  }

  setMany(data: any[]) {
    this._sortCourseList.update(prev => [...prev, ...data]);
  }

  // 如果你真的需要「重建」強制觸發，可以保留這個
  setManyRe(data: any[]) {
    const prev = [...this._sortCourseList()];
    const next = [...prev, ...data];
    this._sortCourseList.set([]);   // 斷開 reference，確保觸發
    this._sortCourseList.set(next);
  }

  setAll(data: any[]) {
    // 也建議這裡保險：永遠存新 reference
    this._sortCourseList.set([...data]);
  }

  add(data: any) {
    const id = data?.id;
    if (id == null) return;

    const exists = this._sortCourseList().some(item => item?.id === id);
    if (exists) return;

    this.setMany([data]);
  }
}
