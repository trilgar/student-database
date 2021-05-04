import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CathedraService {

  constructor(private http: HttpClient) {

  }

  getByName(name: string): Observable<Cathedra[]> {
    const url = `${environment.backend_url}/api/cathedras/by_name?name=${name}`;
    return this.http.get<Cathedra[]>(url);
  }
}

export class Cathedra {
  id: number;
  name: string;
}
