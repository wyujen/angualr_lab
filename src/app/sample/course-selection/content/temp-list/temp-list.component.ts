import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { CourseUiService } from '../../service/course-ui.service';

@Component({
  selector: 'app-temp-list',
  imports: [
    SharedModule
  ],
  templateUrl: './temp-list.component.html',
  styleUrl: './temp-list.component.scss'
})
export class TempListComponent {
  private weekMap: Record<number, string> = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '日'
  };

  trackById = (_: number, item: any) => item.id;
  constructor(
    public uiS: CourseUiService
  ) { }

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
}
