import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {StudentsComponent} from './components/students/students.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule} from '@angular/forms';
import {CreateStudentComponent} from './components/create-student/create-student.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StudentsComponent,
    CreateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
