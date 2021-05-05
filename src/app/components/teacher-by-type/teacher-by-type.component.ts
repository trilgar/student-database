import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GroupService} from "../../services/group/group.service";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {Teacher, TeacherCategory, TeacherService} from "../../services/teacher/teacher.service";
import {Group} from "../create-student/create-student.component";
import {Interval} from "../advanced-search/student-advanced-search.component";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-teacher-by-type',
  templateUrl: './teacher-by-type.component.html',
  styleUrls: ['./teacher-by-type.component.css']
})
export class TeacherByTypeComponent implements OnInit {
  searchTypeList = ['by group', 'by course'];
  selectedSearchType = this.searchTypeList[0];

  teacherTypeList = [TeacherCategory.Assistant, TeacherCategory.Professor, TeacherCategory.Docent,
    TeacherCategory.SeniorLecturer, TeacherCategory.Lecturer];
  selectedTeacherTypes = [];

  groupList = [];
  selectedGroup: Group;
  courseList = [1, 2, 3, 4, 5];
  selectedCourse: number;

  facultyList = [];
  selectedFaculty: Faculty;

  semester = new Interval(0, 10);

  teachers: Teacher[] = [];
  detailsId = -1;
  warningMessage = '';
  warningFlag = false;

  constructor(private router: Router, private groupService: GroupService,
              private facultyService: FacultyService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.dropdownFacultyRefresh();
    this.dropdownGroupRefresh();
  }

  goBack(): void {
    this.router.navigate(['teachers']);
  }

  dropdownGroupRefresh(): void {
    this.groupService.getGroupsByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.groupList = data;
      });
  }

  dropdownFacultyRefresh(): void {
    this.facultyService.getFacultiesByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.facultyList = data;
      });
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.onSubmit();
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });

  }

  showDetails(id: number): void {
    if (this.detailsId === id) {
      this.detailsId = -1;
    } else {
      this.detailsId = id;
    }
  }


  private onSubmit(): void {
    if (this.selectedSearchType === 'by group') {
      this.teacherService.getByCategoryGroup(this.selectedTeacherTypes, this.selectedGroup.id, this.selectedFaculty.id, this.semester)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    } else {
      this.teacherService.getByCategoryCourse(this.selectedTeacherTypes, this.selectedCourse, this.selectedFaculty.id, this.semester)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    }
  }
}
