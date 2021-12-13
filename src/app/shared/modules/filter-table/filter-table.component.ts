import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Col } from '../../models/col.model';
import { RegionFilter } from '../../models/filter.model';

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
  @Input() regionsField: RegionFilter[] = [];

  debouncer: Subject<string> = new Subject(); // Observable

  data: any[] = [];

  valueToFind: string = '';

  isErrorHttp: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe( value => {
      console.log(value)
    });

    console.log(this.regionsField)
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

  keyPressed() {
    this.debouncer.next(this.valueToFind);
  }

  regionSelected(region: RegionFilter) {
    this.isErrorHttp = false;
    this.service.findByName(region.field).subscribe((data: any[]) => {
      this.data = data;
    }, error => {
      this.isErrorHttp = true;
      this.valueToFind = '';
      console.log('**** Error: ', error);
    });
  }
}
