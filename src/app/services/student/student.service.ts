import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../models/Student';
import {environment} from '../../../environments/environment';
import {SearchDto} from '../../components/advanced-search/student-advanced-search.component';
import {Group} from '../../components/create-student/create-student.component';

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

  getByGroup(filterDto: SearchDto): Observable<Student[]> {
    const url = `${environment.backend_url}/api/students/by_group`;
    return this.http.post<Student[]>(url, filterDto);
  }

  getByCourse(filterDto: SearchDto): Observable<Student[]> {
    const url = `${environment.backend_url}/api/students/by_course`;
    return this.http.post<Student[]>(url, filterDto);
  }

  getByDiscipline(groups: Group[], idDiscipline: number, examMark: number): Observable<Student[]> {
    let groupString = '';
    const groupIds = groups.map(group => group.id).map((grpId) => {
      groupString += grpId + ',';
    });
    groupString.substring(0, groupString.length - 1);
    const url = `${environment.backend_url}/api/students/by_disc_and_mark?groups=${groupString}&idDiscipline=${idDiscipline}&mark=${examMark}`;
    return this.http.get<Student[]>(url);
  }

  getByFacultyAndGroups(groups: Group[], facultyId: number, semester: number, mark: number): Observable<Student[]>{
    let groupString = '';
    const groupIds = groups.map(group => group.id).map((grpId) => {
      groupString += grpId + ',';
    });
    groupString.substring(0, groupString.length - 1);

    const url = `${environment.backend_url}/api/students/by_grp_mrk?groups=${groupString}&idFaculty=${facultyId}&mark=${mark}&semester=${semester}`;
    console.log('sending', url);
    return this.http.get<Student[]>(url);
  }

  getByFacultyAndCourse(course: number, facultyId: number, semester: number, mark: number): Observable<Student[]>{
    const url = `${environment.backend_url}/api/students/by_crs_mrk?course=${course}&idFaculty=${facultyId}&mark=${mark}&semester=${semester}`;
    console.log('sending', url);
    return this.http.get<Student[]>(url);
  }
}

export class ServerResponseStatus {
  status: string;
}
