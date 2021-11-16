import { Component, OnInit } from '@angular/core';
import { Col, ColType } from 'src/app/shared/models/col.model';
import { CapitalService } from 'src/app/shared/services/capital.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.css']
})
export class CapitalComponent implements OnInit {

  cols: Col[] = [];

  constructor(public capitalService: CapitalService) {
    this.cols = [
      { field: 'index', title: 'Nº', type: ColType.INDEX, isIndex: true },
      { field: 'flags', subField: 'svg', title: 'Bandera', type: ColType.IMAGE },
      { field: 'name', subField: 'common', title: 'País', type: ColType.TEXT },
      { field: 'capital', subField: '0', title: 'Capital', type: ColType.TEXT },
      { field: 'population', title: 'Población', type: ColType.NUMBER }
    ];
  }

  ngOnInit(): void {
  }

}
