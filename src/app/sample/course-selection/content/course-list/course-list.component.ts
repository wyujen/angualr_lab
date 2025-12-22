import { Component, effect, signal, Signal } from '@angular/core';
import { CourseFakedataService } from '../../service/course-fakedata.service';
import { SharedModule } from '../../../../shared.module';
import { CourseUiService } from '../../service/course-ui.service';
import { CourseSortService } from '../../service/course-sort.service';
import { EntitySortableUiService } from '../entity-sortable/entity-sortable-ui.service';
import { EntityTempUiService } from '../temp-list/entity-temp-ui.service';
import { createFlexibleSearchSignal, SearchParam } from '../../share/search-share-function';
export type CourseType = '必修' | '選修';

@Component({
  selector: 'app-course-list',
  imports: [
    SharedModule,

  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  dataList: any
  trackById = (_: number, item: any) => item.id;
  keyword = ''


  courseSearchParam = signal<SearchParam>({
    state: 'search',
    optionList: []
  })
  courseFilteredList: Signal<any[]>

  constructor(
    private dataS: CourseFakedataService,
    public tempUiS: EntityTempUiService,
    public sortUiS: EntitySortableUiService
  ) {
    this.dataList = this.dataS.fakeData
    this.courseFilteredList = createFlexibleSearchSignal(this.dataS.fakeDataS, this.courseSearchParam)
  }
  private weekMap: Record<number, string> = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '日'
  };

  getTimeText(time: number[][]): string {
    // group by weekday
    const map = new Map<number, number[]>();
    for (const [w, p] of time) {
      if (!map.has(w)) map.set(w, []);
      map.get(w)!.push(p);
    }

    // sort periods & format
    const parts: string[] = [];
    [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([w, ps]) => {
        const sorted = [...ps].sort((a, b) => a - b);
        parts.push(`週${this.weekMap[w]}第${sorted.join('、')}節`);
      });

    return parts.join('；');
  }
  addTemp(c: any) {
    this.tempUiS.add(c)
  }
  addSort(c: any) {
    // this.sortS.add(c);
    this.sortUiS.add(c)
  }
  resetSearch() {
    this.keyword = ''
    this.courseSearchParam.set({
      state: 'search',
      optionList: []
    })
  }
  setSearchParam() {
    this.courseSearchParam.set({
      state: 'search',
      optionList: [
        {
          enabled: true,
          key: 'name',
          type: 'keyword',
          value: this.keyword,
          mold: 'OR'
        },
        {
          enabled: true,
          key: 'code',
          type: 'keyword',
          value: this.keyword,
          mold: 'OR'
        },
        {
          enabled: true,
          key: 'teacher',
          type: 'keyword',
          value: this.keyword,
          mold: 'OR'
        }
      ]

    })
  }

}
