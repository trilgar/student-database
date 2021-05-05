import {Component, OnInit} from '@angular/core';
import {Teacher, TeacherService} from "../../services/teacher/teacher.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  listFaculties: Faculty[];
  warningMessage = '';
  detailsId = -1;
  warningFlag = false;

  constructor(private teacherService: TeacherService, private router: Router,
              private fService: FacultyService) {
  }

  ngOnInit(): void {
    this.doSearch('');
  }


  doSearch(name: string): void {
    this.teacherService.getByName(name)
      .pipe(take(1))
      .subscribe(data => this.teachers = data);

  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.doSearch('');
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });

  }

  create(): void {
    this.router.navigate([`teachers/create`]);
  }

  showDetails(id: number): void {
    if (this.detailsId === id) {
      this.detailsId = -1;
    } else {
      this.detailsId = id;
    }
  }

  advancedSearch(): void {
    this.router.navigate(['teachers/advanced-search'])
  }

  byDiscSearch(): void {
    this.router.navigate(['teachers/by-discipline']);
  }
}
