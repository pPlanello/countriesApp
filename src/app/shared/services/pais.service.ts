import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Country } from '../models/country.model';
import { AbstractServiceService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService extends AbstractServiceService<Country> {

  constructor(public http: HttpClient) { 
    super(http, environment.endpoints.countries);
  }

  getPaisById(id: string): Observable<Array<Country>> {
    return this.http.get<Array<Country>>(`${environment.baseUrl}/${environment.versionUrl}/alpha/${id}`);
  }
}
