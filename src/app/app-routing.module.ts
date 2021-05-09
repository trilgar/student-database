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
import {TeachersHeadsComponent} from "./components/teachers-heads/teachers-heads.component";
import {CathedraAdvancedSearchComponent} from "./components/cathedra-advanced-search/cathedra-advanced-search.component";
import {CreateCathedraComponent} from "./components/create-cathedra/create-cathedra.component";
import {CathedraComponent} from "./components/cathedra/cathedra.component";
import {ScienceWorkComponent} from "./components/science-work/science-work.component";
import {CreateScienceWorkComponent} from "./components/create-science-work/create-science-work.component";
import {ScienceWorkAdvancedSearchComponent} from "./components/science-work-advanced-search/science-work-advanced-search.component";
import {GraduateWorkComponent} from "./components/graduate-work/graduate-work.component";
import {CreateGraduateWorkComponent} from "./components/create-graduate-work/create-graduate-work.component";
import {GwAdvancedSearchComponent} from "./components/gw-advanced-search/gw-advanced-search.component";

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
  {path: 'teachers/by-exam', component: TeacherByExamComponent},
  {path: 'teachers/heads', component: TeachersHeadsComponent},
  {path: 'cathedras', component: CathedraComponent},
  {path: 'cathedras/advanced-search', component: CathedraAdvancedSearchComponent},
  {path: 'cathedras/create-new', component: CreateCathedraComponent},
  {path: 'science-works', component: ScienceWorkComponent},
  {path: 'science-works/create-new', component: CreateScienceWorkComponent},
  {path: 'science-works/advanced-search', component: ScienceWorkAdvancedSearchComponent},
  {path: 'graduate-works', component: GraduateWorkComponent},
  {path: 'graduate-works/advanced-search', component: GwAdvancedSearchComponent},
  {path: 'graduate-works/create', component: CreateGraduateWorkComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
