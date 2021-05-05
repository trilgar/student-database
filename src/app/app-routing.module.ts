import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from './components/students/students.component';
import {CreateStudentComponent} from './components/create-student/create-student.component';
import {StudentAdvancedSearchComponent} from './components/advanced-search/student-advanced-search.component';
import {StudentFilterByMarkComponent} from './components/student-filter-by-mark/student-filter-by-mark.component';
import {SemesterRangeComponent} from './components/semeter-range/semester-range.component';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {CreateTeacherComponent} from "./components/create-teacher/create-teacher.component";
import {TeacherAdvancedSearchComponent} from "./components/teacher-advanced-search/teacher-advanced-search.component";
import {TeacherByDisciplineComponent} from "./components/teacher-by-discipline/teacher-by-discipline.component";
import {TeacherByTypeComponent} from "./components/teacher-by-type/teacher-by-type.component";
import {TeacherByExamComponent} from "./components/teacher-by-exam/teacher-by-exam.component";

const routes: Routes = [

  {path: 'students', component: StudentsComponent},
  {path: 'create-student', component: CreateStudentComponent},
  {path: 'students/advanced-search', component: StudentAdvancedSearchComponent},
  {path: 'students/search-by-mark', component: StudentFilterByMarkComponent},
  {path: 'students/semester-range', component: SemesterRangeComponent},
  {path: 'teachers', component: TeacherComponent},
  {path: 'teachers/create', component: CreateTeacherComponent},
  {path: 'teachers/advanced-search', component: TeacherAdvancedSearchComponent},
  {path: 'teachers/by-discipline', component: TeacherByDisciplineComponent},
  {path: 'teachers/by-type', component: TeacherByTypeComponent},
  {path: 'teachers/by-exam', component: TeacherByExamComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
