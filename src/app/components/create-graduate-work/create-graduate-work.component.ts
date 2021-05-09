import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../../services/student/student.service";
import {Teacher, TeacherService} from "../../services/teacher/teacher.service";
import {GraduateWork, GraduateWorkService} from "../../services/graduate-work/graduate-work.service";
import {take} from "rxjs/operators";
import {Student} from "../../models/Student";

@Component({
  selector: 'app-create-graduate-work',
  templateUrl: './create-graduate-work.component.html',
  styleUrls: ['./create-graduate-work.component.css']
})
export class CreateGraduateWorkComponent implements OnInit {

  teacherList: Teacher[];
  studentList: Student[];

  selectedStudent: Student;
  selectedTeacher: Teacher;
  selectedName = 'new name';
  selectedYear = 2020;
  selectedDescription = 'description';

  warningMessage: string;
  warningFlag = false;

  constructor(private router: Router, private studentService: StudentService,
              private teacherService: TeacherService, private gwService: GraduateWorkService) {
  }

  ngOnInit(): void {
    this.dropdownTeacherRefresh();
    this.dropdownStudentRefresh();
  }

  dropdownTeacherRefresh(): void {
    this.teacherService.getByName('').pipe(take(1))
      .subscribe(data => this.teacherList = data, error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }

  dropdownStudentRefresh(): void {
    this.studentService.getStudents('').pipe(take(1))
      .subscribe(data => this.filterStudents(data), error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }

  private filterStudents(students: Student[]): void {
    let gwIds: number[];
    this.gwService.getByName('').pipe(take(1)).subscribe(data => {
      const graduateWorks: GraduateWork[] = data;
      gwIds = graduateWorks.map(gw => gw.idStudent);
      console.log(students.filter(student => !gwIds.includes(student.id)));
      if (students.filter(student => gwIds.includes(student.id)).length === 0) {
        this.warningMessage = 'all existing students already have graduate works.';
        this.warningFlag = true;
      }
      this.studentList = students.filter(student => !gwIds.includes(student.id));
    });
  }

  goBack(): void {
    this.router.navigate(['graduate-works']);
  }

  onSubmit(): void {
    const gw = new GraduateWork();
    gw.idStudent = this.selectedStudent.id;
    gw.idTeacher = this.selectedTeacher.id;
    gw.year = this.selectedYear;
    gw.name = this.selectedName;
    gw.description = this.selectedDescription;
    this.gwService.create(gw).pipe(take(1))
      .subscribe(data => this.goBack(), error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }
}
