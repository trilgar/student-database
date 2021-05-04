import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../services/group/group.service';
import {StudentService} from '../../services/student/student.service';
import {Discipline, DisciplineService} from '../../services/discipline/discipline.service';
import {take} from 'rxjs/operators';
import {Group} from '../create-student/create-student.component';
import {Interval} from '../advanced-search/student-advanced-search.component';
import {Student} from '../../models/Student';

@Component({
  selector: 'app-semeter-range',
  templateUrl: './semester-range.component.html',
  styleUrls: ['./semester-range.component.css']
})
export class SemesterRangeComponent implements OnInit {
  searchTypeList = ['by group Ids', 'by mark'];
  selectedSearchType = 'by group Ids';
  listGroups: Group[];
  listDisciplines: Discipline[];

  selectedGroups = [];
  selectedDiscipline = 1;
  selectedMark = 5;
  semesterFrom = 0;
  semesterTo = 0;

  students = [];
  warningMessage = '';
  detailsId = -1;

  constructor(private router: Router, private grpService: GroupService,
              private studentService: StudentService, private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.dropdownDisciplineRefresh();
    this.dropdownGroupRefresh();
  }

  goBack(): void {
    this.router.navigate(['students']);
  }

  dropdownGroupRefresh(): void {
    this.grpService.getGroupsByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.listGroups = data;
      });
  }

  dropdownDisciplineRefresh(): void {
    this.disciplineService.getByName('')
      .pipe(take(1))
      .subscribe(data => {
        this.listDisciplines = data;
      });
  }

  onSubmit(): void {
    const semester = new Interval(this.semesterFrom, this.semesterTo);

    if (this.selectedSearchType === 'by group Ids') {
      this.studentService.getByGroupsAndSemester(this.selectedGroups, semester).pipe(take(1)).subscribe(data => this.students = data);
    } else {
      this.studentService.getByMarkAndSemester(this.selectedMark, this.selectedDiscipline, semester)
        .pipe(take(1))
        .subscribe(data => this.students = data);
    }
  }
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.onSubmit();
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
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
