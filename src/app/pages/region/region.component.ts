import { Component, OnInit } from '@angular/core';

import { Col, ColType } from 'src/app/shared/models/col.model';
import { DataService } from 'src/app/shared/services/data.service';
import { RegionService } from 'src/app/shared/services/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  cols: Col[] = [];

  get regions() {
    return this.dataService.regions;
  }

  constructor(public regionService: RegionService, public dataService: DataService) {
    this.cols = [
      { field: 'index', title: 'Nº', type: ColType.INDEX, isIndex: true },
      { field: 'flags', subField: 'svg', title: 'Bandera', type: ColType.IMAGE },
      { field: 'name', subField: 'common', title: 'País', type: ColType.TEXT },
      { field: 'region', title: 'Región', type: ColType.TEXT },
      { field: 'population', title: 'Población', type: ColType.NUMBER }
    ];
  }

  ngOnInit(): void {
  }

}
