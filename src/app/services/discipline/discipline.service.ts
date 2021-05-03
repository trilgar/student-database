import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Group} from "../../components/create-student/create-student.component";

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<Discipline[]> {
    const url = `${environment.backend_url}/api/disciplines/by_name?name=${name}`;
    console.log('Sending request to:', url);
    return this.http.get<Discipline[]>(url);
  }

  getByGroups(groups: Group[]): Observable<Discipline[]> {
    let groupString = '';
    const groupIds = groups.map(group => group.id).map((grpId) => {
      groupString += grpId + ',';
    });
    groupString.substring(0, groupString.length - 1);
    const url = `${environment.backend_url}/api/disciplines/by_groups?groups=${groupString}`;
    return this.http.get<Discipline[]>(url);
  }
}

export class Discipline {
  id: number;
  type: DType;
  idTeacher: number;
  idGroup: number;
  name: string;
  hours: number;
  course: number;
  semester: number;
}

export enum DType {
  Lection = 'Lection',
  Seminar = 'Seminar',
  LabWork = 'LabWork',
  Consultancy = 'Consultancy',
  CourseWork = 'CourseWork'
}
