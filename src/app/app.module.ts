import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {StudentsComponent} from './components/students/students.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule} from '@angular/forms';
import {CreateStudentComponent} from './components/create-student/create-student.component';
import { StudentAdvancedSearchComponent } from './components/advanced-search/student-advanced-search.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { StudentFilterByMarkComponent } from './components/student-filter-by-mark/student-filter-by-mark.component';
import { SemesterRangeComponent } from './components/semeter-range/semester-range.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';
import { TeacherAdvancedSearchComponent } from './components/teacher-advanced-search/teacher-advanced-search.component';
import { TeacherByDisciplineComponent } from './components/teacher-by-discipline/teacher-by-discipline.component';
import { TeacherByTypeComponent } from './components/teacher-by-type/teacher-by-type.component';
import { TeacherByExamComponent } from './components/teacher-by-exam/teacher-by-exam.component';
import { TeachersHeadsComponent } from './components/teachers-heads/teachers-heads.component';
import { CathedraComponent } from './components/cathedra/cathedra.component';
import { CreateCathedraComponent } from './components/create-cathedra/create-cathedra.component';
import { CathedraAdvancedSearchComponent } from './components/cathedra-advanced-search/cathedra-advanced-search.component';
import { ScienceWorkComponent } from './components/science-work/science-work.component';
import { CreateScienceWorkComponent } from './components/create-science-work/create-science-work.component';
import { ScienceWorkAdvancedSearchComponent } from './components/science-work-advanced-search/science-work-advanced-search.component';
import { GraduateWorkComponent } from './components/graduate-work/graduate-work.component';
import { CreateGraduateWorkComponent } from './components/create-graduate-work/create-graduate-work.component';
import { GwAdvancedSearchComponent } from './components/gw-advanced-search/gw-advanced-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StudentsComponent,
    CreateStudentComponent,
    StudentAdvancedSearchComponent,
    StudentFilterByMarkComponent,
    SemesterRangeComponent,
    TeacherComponent,
    CreateTeacherComponent,
    TeacherAdvancedSearchComponent,
    TeacherByDisciplineComponent,
    TeacherByTypeComponent,
    TeacherByExamComponent,
    TeachersHeadsComponent,
    CathedraComponent,
    CreateCathedraComponent,
    CathedraAdvancedSearchComponent,
    ScienceWorkComponent,
    CreateScienceWorkComponent,
    ScienceWorkAdvancedSearchComponent,
    GraduateWorkComponent,
    CreateGraduateWorkComponent,
    GwAdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
