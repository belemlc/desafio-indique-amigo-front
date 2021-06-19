import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicacaoService {

  private api = `${environment.api}/indicacao`;
  private httpOptions: any;

  httpHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    this.httpOptions = {
      headers: headers
    }
  }

  constructor(private http: HttpClient) {
    this.httpHeaders();
  }


  all() {
    return this.http.get<any[]>(this.api, {headers: this.httpOptions});
  }

  async create(indicacao: any) {
    return this.http.post(this.api, indicacao).toPromise();
  }

  async update(indicacao: any, id: number) {
    return this.http.put(`${this.api}/${id}`, indicacao).toPromise();
  }

  async delete(id: number) {
    return this.http.delete(`${this.api}/${id}`).toPromise();
  }
}
