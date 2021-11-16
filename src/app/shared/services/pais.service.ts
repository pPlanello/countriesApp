import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  findCountries(value: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${environment.versionUrl}/${environment.endpoints.countries}/${value}`);
  }
}
