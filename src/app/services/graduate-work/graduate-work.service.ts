import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraduateWorkService {

  constructor(private http: HttpClient) {
  }

  create(gw: GraduateWork): Observable<GraduateWork> {
    const url = `${environment.backend_url}/api/graduate_works`;
    return this.http.post<GraduateWork>(url, gw);
  }

  delete(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/graduate_works/?id=${id}`;
    return this.http.delete(url);
  }

  getByName(name: string): Observable<GraduateWork[]> {
    const url = `${environment.backend_url}/api/graduate_works/by_name?name=${name}`;
    return this.http.get<GraduateWork[]>(url);
  }

  getByCathedra(idCathedra: number): Observable<CombinedGw[]> {
    const url = `${environment.backend_url}/api/graduate_works/by_cathedra?idCathedra=${idCathedra}`;
    return this.http.get<CombinedGw[]>(url);
  }

  getByTeacher(idTeacher: number): Observable<CombinedGw[]> {
    const url = `${environment.backend_url}/api/graduate_works/by_teacher?idTeacher=${idTeacher}`;
    return this.http.get<CombinedGw[]>(url);
  }
}


export class GraduateWork {
  id: number;
  idStudent: number;
  idTeacher: number;
  year: number;
  name: string;
  description: string;
}

export class CombinedGw {
  idStudent: number;
  studentName: string;
  graduateWorkName: string;
}
