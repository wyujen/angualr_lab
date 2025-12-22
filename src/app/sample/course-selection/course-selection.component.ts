import { Component } from '@angular/core';
import { CourseListComponent } from './content/course-list/course-list.component';
import { SharedModule } from '../../shared.module';
import { SortListComponent } from './content/sort-list/sort-list.component';
import { TempListComponent } from './content/temp-list/temp-list.component';
import { EntitySortableComponent } from './content/entity-sortable/entity-sortable.component';

@Component({
  selector: 'app-course-selection',
  imports: [
    CourseListComponent,
    EntitySortableComponent,
    SortListComponent,
    TempListComponent,
    SharedModule
  ],
  templateUrl: './course-selection.component.html',
  styleUrl: './course-selection.component.scss'
})
export class CourseSelectionComponent {

}
