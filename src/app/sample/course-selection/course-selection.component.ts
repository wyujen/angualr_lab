import { Component } from '@angular/core';
import { CourseListComponent } from './content/course-list/course-list.component';
import { SharedModule } from '../../shared.module';
import { SortListComponent } from './content/sort-list/sort-list.component';
import { TempListComponent } from './content/temp-list/temp-list.component';

@Component({
  selector: 'app-course-selection',
  imports: [
    CourseListComponent,
    SortListComponent,
    TempListComponent,
    SharedModule
  ],
  templateUrl: './course-selection.component.html',
  styleUrl: './course-selection.component.scss'
})
export class CourseSelectionComponent {

}
