import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SampleRepository {

  constructor(private http: HttpClient) { }

  getSample(): Observable<any> {
    return this.http.get('/api/example');
  }

  postSample(data:any): Observable<any> {
    return this.http.post('/api/example', data);
  }
}
