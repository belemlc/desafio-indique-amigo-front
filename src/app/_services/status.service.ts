import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private api = `${environment.api}/status`;

  constructor(private http: HttpClient) { }

  async all() {
    return this.http.get(this.api).toPromise();
  }
}
