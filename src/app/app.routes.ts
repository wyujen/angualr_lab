import { Routes } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { SortTableComponent } from './sort-table/sort-table.component';

export const routes: Routes = [
    { path: 'pdf', component: PdfComponent },
    { path: 'sort-table', component: SortTableComponent },
];
