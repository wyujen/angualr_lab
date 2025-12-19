// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // 如果有使用 ngModel
import { ReactiveFormsModule } from '@angular/forms';  // 如果使用 Reactive Forms

@NgModule({
    declarations: [],
    imports: [
        CommonModule,  
        FormsModule,   
        ReactiveFormsModule  
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule  
    ]
})
export class SharedModule { }
