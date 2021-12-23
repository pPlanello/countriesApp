import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Col } from '../../models/col.model';
import { RegionFilter } from '../../models/filter.model';

import { AbstractServiceService } from '../../services/abstract-service.service';
import { CapitalService } from '../../services/capital.service';
import { PaisService } from '../../services/pais.service';

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
  @Input() filterPlaceHolder: string = '';

  debouncer: Subject<string> = new Subject(); // Observable

  data: any[] = [];
  valueToFind: string = '';
  isErrorHttp: boolean = false;
  regionActive: RegionFilter = {field: '', value_es: ''};
  suggestions: string[] = [];


  constructor() { }

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe( value => {
      console.log(value);
      this.service.findSuggestions(value).subscribe((data: any[]) => {
        this.suggestions = [];
        // Se determina el tipo de sugerencias en función de la capital
        if (this.service instanceof CapitalService) {
          data.forEach(elem => this.suggestions.push(elem.capital));
        }
        if (this.service instanceof PaisService) {
          data.forEach(elem => this.suggestions.push(elem.name.common));
        }
        // Solo se muestran las 10 primeras
        this.suggestions = this.suggestions.splice(0, 10);
      }, error => {
        this.valueToFind = '';
        console.error('**** Error: ', error);
      });
    });
  }

  find() {
    this.isErrorHttp = false;
    this.service.findByName(this.valueToFind).subscribe((data: any[]) => {
      this.data = data;
    }, error => {
      this.isErrorHttp = true;
      this.valueToFind = '';
      console.error('**** Error: ', error);
    });
  }

  keyPressed() {
    this.debouncer.next(this.valueToFind);
  }

  regionSelected(region: RegionFilter) {
    this.isErrorHttp = false;
    this.regionActive = region;
    this.service.findByName(region.field).subscribe((data: any[]) => {
      this.data = data;
    }, error => {
      this.isErrorHttp = true;
      this.valueToFind = '';
      console.error('**** Error: ', error);
    });
  }

  selectedSuggestions(suggestion: any) {
    this.valueToFind = suggestion;
    this.suggestions = [];
    this.find();
  }
}
