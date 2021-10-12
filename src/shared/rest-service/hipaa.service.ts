import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Hipaa} from "../model/hipaa";

@Injectable({
  providedIn: 'root'
})
export class HipaaService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  save(data: any) {
    return this.httpClient.post<Hipaa>(this.url + '/hipaa', data);
  }

  update(data: any) {
    return this.httpClient.put<Hipaa>(this.url + `/hipaa/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(this.url + `/hipaa/${id}`, {params: {id: id}});
  }

  list() {
    return this.httpClient.get<Hipaa[]>(this.url + '/hipaa');
  }
}
