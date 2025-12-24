import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { EntitySortableUiService } from '../entity-sortable/entity-sortable-ui.service';


@Component({
  selector: 'app-course-table',
  imports: [
    SharedModule
  ],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CourseTableComponent implements OnInit {

  weekdays = ['一', '二', '三', '四', '五', '六', '日'];

  // 節次 1～15
  periods = Array.from({ length: 15 }, (_, i) => i + 1);

  // 課表資料 [節次][星期]

  constructor(
    public sortUiS: EntitySortableUiService
  ) { }


  courses: any[] = [
    {
      name: '微積分',
      teacher: '王老師',
      location: '理工305',
      time: [
        [1, 1],
        [1, 2]
      ]
    },
    {
      name: '普通物理',
      teacher: '林老師',
      location: '理工201',
      time: [
        [3, 3],
        [3, 4]
      ]
    }
  ];

  ngOnInit() {
    // this.buildTimetable(this.courses);
  }

  // buildTimetable(courses: any[]) {
  //   // 先清空
  //   this.timetable.forEach(row => row.fill(null));

  //   courses.forEach((course: any) => {
  //     course.time.forEach(([day, period]: [any, any]) => {

  //       const row = period - 1; // 節次
  //       const col = day - 1;    // 星期

  //       this.timetable[row][col] = {
  //         name: course.name,
  //         teacher: course.teacher,
  //         location: course.location
  //       };
  //     });
  //   });
  // }

}
