import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../models/Student';
import {environment} from '../../../environments/environment';
import {Interval, SearchDto} from '../../components/advanced-search/student-advanced-search.component';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_name?name=${name}`;
    return this.http.get<Teacher[]>(url);

  }

  deleteTeacher(id: number): Observable<any> {
    const url = `${environment.backend_url}/api/teachers/?id=${id}`;
    return this.http.delete<any>(url);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    const url = `${environment.backend_url}/api/teachers`;
    return this.http.post<Teacher>(url, teacher);
  }

  getByFaculty(filterDto: SearchDto): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_faculty`;
    return this.http.post<Teacher[]>(url, filterDto);
  }

  getByCathedra(filterDto: SearchDto): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_cathedra`;
    return this.http.post<Teacher[]>(url, filterDto);
  }

  getByGroup(disciplineName: string, idGroup: number, idFaculty: number): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_group?dName=${disciplineName}&idGroup=${idGroup}&idFaculty=${idFaculty}`;
    return this.http.get<Teacher[]>(url);
  }

  getByCourse(disciplineName: string, course: number, idFaculty: number): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_course?dName=${disciplineName}&course=${course}&idFaculty=${idFaculty}`;
    return this.http.get<Teacher[]>(url);
  }

  getByCategoryGroup(teacherCategories: TeacherCategory[], idGroup: number, idFaculty: number, semester: Interval): Observable<Teacher[]> {
    let categoryString = '';
    teacherCategories.map(category => {
      categoryString += category + ',';
    });
    categoryString.substring(0, categoryString.length - 1);
    const url = `${environment.backend_url}/api/teachers/by_category_group?categories=${categoryString}&idGroup=${idGroup}&idFaculty=${idFaculty}&from=${semester.from}&to=${semester.to}`;
    return this.http.get<Teacher[]>(url);
  }

  getByCategoryCourse(teacherCategories: TeacherCategory[], course: number, idFaculty: number, semester: Interval): Observable<Teacher[]> {
    let categoryString = '';
    teacherCategories.map(category => {
      categoryString += category + ',';
    });
    categoryString.substring(0, categoryString.length - 1);
    const url = `${environment.backend_url}/api/teachers/by_category_course?categories=${categoryString}&course=${course}&idFaculty=${idFaculty}&from=${semester.from}&to=${semester.to}`;
    return this.http.get<Teacher[]>(url);
  }

  getByExams(idGroup: number, disciplineName: string, semester: number): Observable<Teacher[]> {
    const url = `${environment.backend_url}/api/teachers/by_exams?idGroup=${idGroup}&dName=${disciplineName}&semester=${semester}`;
    return this.http.get<Teacher[]>(url);
  }

  getHeadsByCathedra(categories: TeacherCategory[], idCathedra: number): Observable<Teacher[]> {
    let categoryString = '';
    categories.map(category => {
      categoryString += category + ',';
    });
    categoryString.substring(0, categoryString.length - 1);
    const url = `${environment.backend_url}/api/teachers/heads/by_cathedra?categories=${categoryString}&idCathedra=${idCathedra}`;
    return this.http.get<Teacher[]>(url);
  }

  getHeadsByFaculty(categories: TeacherCategory[], idFaculty: number): Observable<Teacher[]> {
    let categoryString = '';
    categories.map(category => {
      categoryString += category + ',';
    });
    categoryString.substring(0, categoryString.length - 1);
    const url = `${environment.backend_url}/api/teachers/heads/by_faculty?categories=${categoryString}&idFaculty=${idFaculty}`;
    return this.http.get<Teacher[]>(url);
  }

}

export class Teacher {
  id: number;
  name: string;
  facultyId: number;
  category: TeacherCategory;
  year: number;
  wage: number;
  asp: AspStatus;
  gender: Gender;
  age: number;
  kids: number;
  idCathedra: number;
}

export enum TeacherCategory {
  Assistant = 'Assistant',
  Lecturer = 'Lecturer',
  SeniorLecturer = 'SeniorLecturer',
  Docent = 'Docent',
  Professor = 'Professor'
}

export enum AspStatus {
  TRUE = 'TRUE',
  FALSE = 'FALSE'
}
