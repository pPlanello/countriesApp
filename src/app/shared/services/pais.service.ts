import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { AbstractServiceService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService extends AbstractServiceService<Country> {

  constructor( http: HttpClient) { 
    super(http, environment.endpoints.countries);
  }
}
