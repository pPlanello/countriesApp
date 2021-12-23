import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class AbstractServiceService<T> {

  constructor(public http: HttpClient, protected endpoint: string ) { }


  findByName(value: string): Observable<Array<T>> {
    return this.http.get<Array<T>>(`${environment.baseUrl}/${environment.versionUrl}/${this.endpoint}/${value}`);
  }

  findSuggestions(value: string): Observable<Array<T>> {
    return this.http.get<Array<T>>(`${environment.baseUrl}/${environment.versionUrl}/${this.endpoint}/${value}`);
  }
}
