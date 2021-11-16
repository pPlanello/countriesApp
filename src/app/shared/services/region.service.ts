import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Region } from '../models/region.model';
import { AbstractServiceService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends AbstractServiceService<Region> {

  constructor( http: HttpClient) { 
    super(http, environment.endpoints.region);
  }
}
