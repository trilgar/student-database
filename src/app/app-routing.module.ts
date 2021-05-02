import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from './components/students/students.component';
import {CreateStudentComponent} from './components/create-student/create-student.component';

const routes: Routes = [

  {path: 'students', component: StudentsComponent},
  {path: 'create-student', component: CreateStudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
