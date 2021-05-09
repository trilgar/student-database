import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Teacher, TeacherService} from '../../services/teacher/teacher.service';
import {Cathedra, CathedraService} from '../../services/cathedra/cathedra.service';
import {DisciplineService, TeacherLoad} from '../../services/discipline/discipline.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-discipline-load',
  templateUrl: './discipline-load.component.html',
  styleUrls: ['./discipline-load.component.css']
})
export class DisciplineLoadComponent implements OnInit {
  selectedSemester = 1;
  selectedTeacher: Teacher;
  teacherList: Teacher[];
  selectedCathedra: Cathedra;
  cathedraList: Cathedra[];
  searchTypeList = ['by teacher', 'by cathedra'];
  selectedSearchType = this.searchTypeList[0];
  disciplineLoadList: TeacherLoad[] = [];

  warningMessage: string;
  warningFlag = false;

  constructor(private router: Router, private teacherService: TeacherService,
              private cathedraService: CathedraService, private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.dropdownTeacherRefresh();
    this.dropdownCathedraRefresh();
  }

  dropdownTeacherRefresh(): void {
    this.teacherService.getByName('').pipe(take(1))
      .subscribe(data => this.teacherList = data, error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
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

  onSubmit(): void {
    if (this.selectedSearchType === 'by teacher') {
      this.disciplineService.getLoadByTeacher(this.selectedTeacher.id, this.selectedSemester)
        .pipe(take(1)).subscribe(data => this.disciplineLoadList = data);
    } else {
      this.disciplineService.getLoadByCathedra(this.selectedCathedra.id, this.selectedSemester)
        .pipe(take(1)).subscribe(data => this.disciplineLoadList = data);
    }
  }
}
