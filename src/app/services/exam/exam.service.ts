import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<Exam[]> {
    const url = `${environment.backend_url}/api/exams/by_name?name=${name}`;
    return this.http.get<Exam[]>(url);
  }

  create(exam: Exam): Observable<Exam> {
    const url = `${environment.backend_url}/api/exams`;
    return this.http.post<Exam>(url, exam);
  }

  delete(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/exams?id=${id}`;
    return this.http.delete(url);
  }

  getIds(idDiscipline: number, idStudent: number): Observable<Exam> {
    const url = `${environment.backend_url}/api/exams/validate?idDiscipline=${idDiscipline}&idStudent=${idStudent}`;
    return this.http.get<Exam>(url);
  }
}

export enum ExamType {
  Exam = 'Exam',
  Credit = 'Credit'
}

export class Exam {
  id: number;
  type: ExamType;
  idDiscipline: number;
  idStudent: number;
  description: string;
  mark: number;
}
