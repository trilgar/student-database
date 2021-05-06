import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScienceWorkService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<ScienceWork[]> {
    const url = `${environment.backend_url}api/science_works/by_name?name=${name}`;
    return this.http.get<ScienceWork[]>(url);
  }

  create(sw: ScienceWork): Observable<ScienceWork> {
    const url = `${environment.backend_url}/api/science_works`;
    return this.http.post<ScienceWork>(url, sw);
  }

  delete(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/science_works?id=${id}`;
    return this.http.delete(url);
  }

  getByFilters(idCathedra: number, idFaculty: number): Observable<ScienceWork[]> {
    const url = `${environment.backend_url}/api/science_works/by_filters?cathedra=${idCathedra}&faculty=${idFaculty}`;
    return this.http.get<ScienceWork[]>(url);
  }
}


export class ScienceWork {
  id: number;
  type: SwType;
  idTeacher: number;
  year: number;
  name: string;
  description: string;
}

export enum SwType {
  CandidateWork = 'CandidateWork',
  DissertationWork = 'DissertationWork'
}
