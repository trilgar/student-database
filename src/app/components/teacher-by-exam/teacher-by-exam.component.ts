import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../services/group/group.service';
import {Discipline, DisciplineService} from '../../services/discipline/discipline.service';
import {take} from 'rxjs/operators';
import {Teacher, TeacherService} from '../../services/teacher/teacher.service';
import {Group} from '../create-student/create-student.component';

@Component({
  selector: 'app-teacher-by-exam',
  templateUrl: './teacher-by-exam.component.html',
  styleUrls: ['./teacher-by-exam.component.css']
})
export class TeacherByExamComponent implements OnInit {
  detailsId = -1;
  warningMessage: string;
  warningFlag = false;

  groupList: Group[];
  selectedGroups = [];
  disciplineList: Discipline[] = [];
  selectedDiscipline: Discipline;
  selectedSemester = 1;

  teachers: Teacher[] = [];

  constructor(private router: Router, private groupService: GroupService,
              private disciplineService: DisciplineService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
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

  disciplineDropdownActualise(): void {
    this.disciplineService.getByGroups(this.selectedGroups)
      .pipe(take(1))
      .subscribe(data => {
        this.disciplineList = this.removeDublications(data);
      });
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

  private onSubmit(): void {
    this.teacherService.getByExams(this.selectedGroups, this.selectedDiscipline.name, this.selectedSemester)
      .pipe(take(1)).subscribe(data => this.teachers = data);
  }
}
