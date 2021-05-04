import {Component, OnInit} from '@angular/core';
import {AspStatus, Teacher, TeacherCategory, TeacherService} from "../../services/teacher/teacher.service";
import {Router} from "@angular/router";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {Cathedra, CathedraService} from "../../services/cathedra/cathedra.service";
import {take} from "rxjs/operators";
import {Gender} from "../../models/Student";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {

  warningMessage: string;
  warningFlag = false;

  cathedraList: Cathedra[];
  facultyList: Faculty[];
  categoryList = [TeacherCategory.Assistant, TeacherCategory.Lecturer,
    TeacherCategory.SeniorLecturer, TeacherCategory.Docent, TeacherCategory.Professor];
  aspStatuses = [AspStatus.TRUE, AspStatus.FALSE];
  genderList = [Gender.MALE, Gender.FEMALE];
  newTeacher: Teacher = {
    id: 0,
    name: 'new name',
    facultyId: 0,
    category: TeacherCategory.Assistant,
    year: 2020,
    wage: 0,
    asp: AspStatus.FALSE,
    gender: Gender.MALE,
    age: 0,
    kids: 0,
    idCathedra: 0
  };

  constructor(private teacherService: TeacherService, private router: Router,
              private facultyService: FacultyService, private cathedraService: CathedraService) {
  }

  ngOnInit(): void {
    this.dropdownFacultyRefresh();
    this.dropdownCathedraRefresh();
  }

  dropdownFacultyRefresh(): void {
    this.facultyService.getFacultiesByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.facultyList = data;
      });
  }

  dropdownCathedraRefresh(): void {
    this.cathedraService.getByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.cathedraList = data;
      });
  }

  goBack(): void {
    this.router.navigate(['teachers']);
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.newTeacher)
      .pipe(take(1))
      .subscribe(data => this.router.navigate(['teachers']), error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }
}
