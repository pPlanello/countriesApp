import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Col } from '../../models/col.model';
import { AbstractServiceService } from '../../services/abstract-service.service';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {

  @Input() service!: AbstractServiceService<any>;
  @Input() cols: Col[] = [];
  @Input() colRouterLink: boolean = false;
  @Input() colRedirectUrlLink: string = '';

  data: any[] = [];

  valueToFind: string = '';

  isErrorHttp: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  find() {
    this.isErrorHttp = false;
    this.service.findByName(this.valueToFind).subscribe((data: any[]) => {
      this.data = data;
    }, error => {
      this.isErrorHttp = true;
      this.valueToFind = '';
      console.log('**** Error: ', error);
    });
  }
}
