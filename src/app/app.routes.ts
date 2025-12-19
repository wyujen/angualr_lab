import { Routes } from '@angular/router';
import { PdfComponent } from './try/pdf/pdf.component';
import { SortTableComponent } from './try/sort-table/sort-table.component';
import { CourseSelectionComponent } from './sample/course-selection/course-selection.component';

export const routes: Routes = [
    { path: 'pdf', component: PdfComponent },
    { path: 'sort-table', component: SortTableComponent },
    { path: 'course-selection', component: CourseSelectionComponent }
];
