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

  getByCourses(courses: number[]): Observable<Discipline[]> {
    let courseString = '';
    courses.map((crs) => {
      courseString += crs + ',';
    });
    courseString.substring(0, courseString.length - 1);
    const url = `${environment.backend_url}/api/disciplines/by_courses?courses=${courseString}`;
    return this.http.get<Discipline[]>(url);
  }

  getLoadByTeacher(idTeacher: number, semester: number): Observable<TeacherLoad[]> {
    const url = `${environment.backend_url}/api/disciplines/load/by_teacher?idTeacher=${idTeacher}&semester=${semester}`;
    return this.http.get<TeacherLoad[]>(url);
  }

  getLoadByCathedra(idCathedra: number, semester: number): Observable<TeacherLoad[]> {
    const url = `${environment.backend_url}/api/disciplines/load/by_cathedra?cathedra=${idCathedra}&semester=${semester}`;
    return this.http.get<TeacherLoad[]>(url);
  }

  create(discipline: Discipline): Observable<Discipline> {
    const url = `${environment.backend_url}/api/disciplines`;
    return this.http.post<Discipline>(url, discipline);
  }

  delete(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/disciplines?id=${id}`;
    return this.http.delete(url);
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

export class TeacherLoad {
  disciplineName: string;
  lectionHours: number;
  seminarHours: number;
  labWorkHours: number;
  consultancyHours: number;
  courseworkHours: number;
}
