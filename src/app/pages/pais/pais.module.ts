import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './pais.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaisModalComponent } from './pais-modal/pais-modal.component';
import { FilterTableModule } from 'src/app/shared/modules/filter-table/filter-table.module';



@NgModule({
  declarations: [
    PaisComponent,
    PaisModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FilterTableModule
  ]
})
export class PaisModule { }
