import { Injectable } from '@angular/core';
import { RegionFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  regions: RegionFilter[] = [];
  constructor() { 
    this.regions = [
      {field: 'south america', value_es: 'Sur América'},
      {field: 'southern europe', value_es: 'Sur Europa'},
      {field: 'central america', value_es: 'América Central'},
      {field: 'eastern asia', value_es: 'Asia del Este'}
    ]
  }
}
