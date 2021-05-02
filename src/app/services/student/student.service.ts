import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../models/Student';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getStudents(name: string): Observable<Student[]> {
    const url = `${environment.backend_url}/api/students/by_name?name=${name}`;
    return this.http.get<Student[]>(url);
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/students/?id=${id}`;
    return this.http.delete<any>(url);
  }

  createStudent(student: Student): Observable<Student> {
    const url = `${environment.backend_url}/api/students`;
    return this.http.post<Student>(url, student);
  }
}

export class ServerResponseStatus {
  status: string;
}
