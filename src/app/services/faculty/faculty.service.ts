import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../../components/create-student/create-student.component';
import {environment} from '../../../environments/environment';

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
}

export class Faculty {
  id: number;
  name: string;
}
