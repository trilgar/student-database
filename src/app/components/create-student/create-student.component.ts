import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {StudentService} from '../../services/student/student.service';
import {GroupService} from '../../services/group/group.service';
import {take} from 'rxjs/operators';
import {Gender, Student} from '../../models/Student';
import {Faculty, FacultyService} from '../../services/faculty/faculty.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  listGroups: Array<Group> = [];
  listFaculties: Array<Faculty> = [];
  newStudent: Student;
  genderList = [Gender.MALE, Gender.FEMALE];
  warningMessage: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private stService: StudentService,
              private grpService: GroupService, private fService: FacultyService) {
  }

  ngOnInit(): void {
    this.dropdownGroupRefresh();
    this.dropdownFacultyRefresh();
    this.newStudent = new Student();
    this.newStudent.name = 'new name';
    this.newStudent.idGroup = 1;
    this.newStudent.idFaculty = 1;
    this.newStudent.stipendium = 0;
    this.newStudent.gender = Gender.MALE;
    this.newStudent.age = 0;
    this.newStudent.kids = 0;
  }

  dropdownGroupRefresh(): void {
    this.grpService.getGroupsByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.listGroups = data;
      });
  }

  dropdownFacultyRefresh(): void {
    this.fService.getFacultiesByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.listFaculties = data;
      });
  }

  createStudent(): void {
    this.stService.createStudent(this.newStudent)
      .pipe(take(1))
      .subscribe((data) => {
          this.router.navigate([`students`]);
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
        });
  }

  goBack(): void {
    this.router.navigate([`students`]);
  }
}

export class Group {
  id: number;
  name: string;
  course: number;
  semester: number;
}
