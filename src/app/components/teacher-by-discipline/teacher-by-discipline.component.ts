import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Discipline, DisciplineService} from '../../services/discipline/discipline.service';
import {GroupService} from '../../services/group/group.service';
import {Faculty, FacultyService} from '../../services/faculty/faculty.service';
import {Teacher, TeacherService} from '../../services/teacher/teacher.service';
import {Group} from '../create-student/create-student.component';
import {take} from 'rxjs/operators';
import {log} from "util";

@Component({
  selector: 'app-teacher-by-discipline',
  templateUrl: './teacher-by-discipline.component.html',
  styleUrls: ['./teacher-by-discipline.component.css']
})
export class TeacherByDisciplineComponent implements OnInit {
  searchTypeList: string[] = ['by group', 'by course'];
  selectedSearchType: string = this.searchTypeList[0];

  disciplineList: Discipline[] = [];
  groupList: Group[] = [];
  facultyList: Faculty[] = [];
  courseList = [1, 2, 3, 4, 5];

  selectedDiscipline: Discipline;
  selectedGroup: Group;
  selectedCourse: number;
  selectedFaculty: Faculty;

  teachers: Teacher[] = [];
  warningFlag = false;
  warningMessage: string;
  detailsId = -1;

  constructor(private router: Router, private disciplineService: DisciplineService, private groupService: GroupService,
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

  disciplineDropdownActualise(refreshMode: string): void {
    if (refreshMode === 'group') {
      this.disciplineService.getByGroups(new Array(this.selectedGroup))
        .pipe(take(1))
        .subscribe(data => {
          this.disciplineList = this.removeDublications(data);
        });
    } else {
      this.disciplineService.getByCourses([this.selectedCourse])
        .pipe(take(1))
        .subscribe(data => this.disciplineList = this.removeDublications(data));
    }
  }

  private removeDublications(data: Discipline[]): Discipline[] {
    const dNames = [];
    return data.filter((discipline) => {
      if (dNames.includes(discipline.name)) {
        return false;
      } else {
        dNames.push(discipline.name);
        return true;
      }
    });
  }

  onSubmit(): void {
    if (this.selectedSearchType === 'by group') {
      this.teacherService.getByGroup(this.selectedDiscipline.name, this.selectedGroup.id, this.selectedFaculty.id)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    } else {
      this.teacherService.getByCourse(this.selectedDiscipline.name, this.selectedCourse, this.selectedFaculty.id)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    }
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
}
