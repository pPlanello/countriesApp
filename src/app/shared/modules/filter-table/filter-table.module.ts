import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from './filter-table.component';
import { FormsModule } from '@angular/forms';
import { GenericTableModule } from '../generic-table/generic-table.module';



@NgModule({
  declarations: [
    FilterTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GenericTableModule
  ],
  exports: [
    FilterTableComponent
  ]
})
export class FilterTableModule { }
