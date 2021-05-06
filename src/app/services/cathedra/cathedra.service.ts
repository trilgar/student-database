import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Interval} from "../../components/advanced-search/student-advanced-search.component";

@Injectable({
  providedIn: 'root'
})
export class CathedraService {

  constructor(private http: HttpClient) {

  }

  create(cathedra: Cathedra): Observable<Cathedra> {
    const url = `${environment.backend_url}/api/cathedras`;
    return this.http.post<Cathedra>(url, cathedra);
  }

  getByName(name: string): Observable<Cathedra[]> {
    const url = `${environment.backend_url}/api/cathedras/by_name?name=${name}`;
    return this.http.get<Cathedra[]>(url);
  }

  deleteCathedra(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/cathedras?id=${id}`;
    return this.http.delete(url);
  }

  getByGroup(groupId: number, facultyId: number, semester: Interval): Observable<Cathedra[]> {
    const url = `${environment.backend_url}/api/cathedras/by_group?idGroup=${groupId}&idFaculty=${facultyId}&semFrom=${semester.from}&semTo=${semester.to}`;
    return this.http.get<Cathedra[]>(url);
  }

  getByCourse(course: number, facultyId: number, semester: Interval): Observable<Cathedra[]> {
    const url = `${environment.backend_url}/api/cathedras/by_course?idCourse=${course}&idFaculty=${facultyId}&semFrom=${semester.from}&semTo=${semester.to}`;
    return this.http.get<Cathedra[]>(url);
  }
}

export class Cathedra {
  id: number;
  name: string;
}
