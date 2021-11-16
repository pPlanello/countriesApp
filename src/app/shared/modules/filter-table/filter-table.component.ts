import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractServiceService } from '../../services/abstract-service.service';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {

  @Input() service!: AbstractServiceService<any>;

  data: any[] = [];

  valueToFind: string = '';

  isErrorHttp: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  find() {
    console.log(this.valueToFind)
    this.service.findByName(this.valueToFind).subscribe((data: any[]) => {
      this.data = data;
    }, error => {
      this.isErrorHttp = true;
      this.valueToFind = '';
      console.log('error: ', error);
    });
  }
}
