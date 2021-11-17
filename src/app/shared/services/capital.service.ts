import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Capital } from '../models/capital.model';
import { AbstractServiceService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class CapitalService extends AbstractServiceService<Capital> {

  constructor( http: HttpClient) { 
    super(http, environment.endpoints.capital);
  }
}