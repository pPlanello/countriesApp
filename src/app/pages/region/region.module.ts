import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region.component';
import { FilterTableModule } from 'src/app/shared/modules/filter-table/filter-table.module';



@NgModule({
  declarations: [
    RegionComponent
  ],
  imports: [
    CommonModule,
    FilterTableModule
  ]
})
export class RegionModule { }
