import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GenericTableComponent
  ]
})
export class GenericTableModule { }
