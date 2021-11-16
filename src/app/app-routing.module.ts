import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalComponent } from './pages/capital/capital.component';
import { PaisModalComponent } from './pages/pais/pais-modal/pais-modal.component';
import { PaisComponent } from './pages/pais/pais.component';
import { RegionComponent } from './pages/region/region.component';

const routes: Routes = [
  {
    path: '',
    component: PaisComponent
  },
  {
    path: 'region',
    component: RegionComponent
  },
  {
    path: 'capital',
    component: CapitalComponent
  },
  {
    path: 'pais/:id',
    component: PaisModalComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
