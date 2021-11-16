import { Component, OnInit } from '@angular/core';
import { Col, ColType } from 'src/app/shared/models/col.model';
import { Country } from 'src/app/shared/models/country.model';
import { PaisService } from 'src/app/shared/services/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  cols: Col[] = [];
  
  constructor(public paisService: PaisService) { 
    this.cols = [
      { field: 'index', title: 'Nº', type: ColType.INDEX, isIndex: true },
      { field: 'flags', subField: 'svg', title: 'Bandera', type: ColType.IMAGE },
      { field: 'name', subField: 'common', title: 'País', type: ColType.TEXT },
      { field: 'population', title: 'Población', type: ColType.NUMBER }
    ];
  }

  ngOnInit(): void {  }
}
