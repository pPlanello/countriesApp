import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Col, ColType } from '../../models/col.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit, OnChanges {

  @Input() data: any[] = [];
  @Input() cols: Col[] = [];
  @Input() colRouterLink: boolean = false;
  @Input() colRedirectUrlLink: string = '';

  colType = ColType;

  constructor() { }

  ngOnInit(): void {
    console.log('columnas', this.cols)
  }

  ngOnChanges(): void {
    console.log('datos', this.data)
  }

}
