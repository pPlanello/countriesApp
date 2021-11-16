import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalComponent } from './capital.component';
import { FilterTableModule } from 'src/app/shared/modules/filter-table/filter-table.module';



@NgModule({
  declarations: [
    CapitalComponent
  ],
  imports: [
    CommonModule,
    FilterTableModule
  ]
})
export class CapitalModule { }
