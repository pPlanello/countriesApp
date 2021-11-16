import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  findCountries(value: string): Observable<Array<Country>> {
    return this.http.get<Array<Country>>(`${environment.baseUrl}/${environment.versionUrl}/${environment.endpoints.countries}/${value}`);
  }
}
