import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/Student';
import {Router} from '@angular/router';
import {StudentService} from '../../services/student/student.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  totalNumber = 0;
  students: Student[] = [];
  warningMessage: string;
  warningFlag = false;
  detailsId: number;

  newStudent: Student;

  constructor(private router: Router,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.listStudents();
  }


  listStudents(): void {
    this.studentService
      .getStudents('')
      .pipe(take(1))
      .subscribe(data => {
        this.students = data;
        this.totalNumber = data.length;
      });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.listStudents();
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });

  }

  doSearch(name: string): void {
    this.studentService
      .getStudents(name)
      .pipe(take(1))
      .subscribe(data => {
        this.students = data;
        this.totalNumber = data.length;
      });
  }

  create(): void {
    this.router.navigate([`create-student`]);
  }

  showDetails(id: number): void {
    if (this.detailsId === id) {
      this.detailsId = -1;
    } else {
      this.detailsId = id;
    }
  }

  advancedSearch(): void {
    this.router.navigate(['students/advanced-search']);
  }
}
