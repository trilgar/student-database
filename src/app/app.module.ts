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
import {NgSelectModule} from "@ng-select/ng-select";
import { StudentFilterByMarkComponent } from './components/student-filter-by-mark/student-filter-by-mark.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StudentsComponent,
    CreateStudentComponent,
    StudentAdvancedSearchComponent,
    StudentFilterByMarkComponent
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
