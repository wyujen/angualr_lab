import { Component, effect } from '@angular/core';
import { CourseFakedataService } from '../../service/course-fakedata.service';
import { SharedModule } from '../../../../shared.module';
import { CourseUiService } from '../../service/course-ui.service';
import { CourseSortService } from '../../service/course-sort.service';
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

  constructor(
    private dataS: CourseFakedataService,
    private uiS: CourseUiService,
    private sortS: CourseSortService
  ) {
    this.dataList = this.dataS.fakeData
    effect(() => {
      const temp = this.uiS.tempSelectedListS()
      console.log('temp', temp)
    })
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
    this.uiS.set(c)
  }
  addSort(c: any) {
    this.sortS.add(c);
  }

}
