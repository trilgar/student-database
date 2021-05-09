import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) {
  }

  getFacultiesByName(name: string): Observable<Faculty[]> {
    const url = `${environment.backend_url}/api/faculties/by_name?name=${name}`;
    console.log('Sending request to:', url);
    return this.http.get<Faculty[]>(url);
  }

  create(faculty: Faculty): Observable<Faculty> {
    const url = `${environment.backend_url}/api/faculties`;
    return this.http.post<Faculty>(url, faculty);
  }

  delete(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/faculties?id=${id}`;
    return this.http.delete(url);
  }

}

export class Faculty {
  id: number;
  name: string;
}
