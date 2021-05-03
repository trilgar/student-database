import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from './components/students/students.component';
import {CreateStudentComponent} from './components/create-student/create-student.component';
import {StudentAdvancedSearchComponent} from "./components/advanced-search/student-advanced-search.component";
import {StudentFilterByMarkComponent} from "./components/student-filter-by-mark/student-filter-by-mark.component";

const routes: Routes = [

  {path: 'students', component: StudentsComponent},
  {path: 'create-student', component: CreateStudentComponent},
  {path: 'students/advanced-search', component: StudentAdvancedSearchComponent},
  {path: 'students/search-by-mark', component: StudentFilterByMarkComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
