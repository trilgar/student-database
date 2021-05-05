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
    TeacherByExamComponent
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
