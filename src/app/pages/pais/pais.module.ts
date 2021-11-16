import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './pais.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaisModalComponent } from './pais-modal/pais-modal.component';



@NgModule({
  declarations: [
    PaisComponent,
    PaisModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class PaisModule { }
