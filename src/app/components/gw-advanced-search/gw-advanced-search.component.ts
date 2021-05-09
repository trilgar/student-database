import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CombinedGw, GraduateWorkService} from "../../services/graduate-work/graduate-work.service";
import {Cathedra, CathedraService} from "../../services/cathedra/cathedra.service";
import {Teacher, TeacherService} from "../../services/teacher/teacher.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-gw-advanced-search',
  templateUrl: './gw-advanced-search.component.html',
  styleUrls: ['./gw-advanced-search.component.css']
})
export class GwAdvancedSearchComponent implements OnInit {

  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  teacherList: Teacher[];
  cathedraList: Cathedra[];

  selectedTeacher: Teacher;
  selectedCathedra: Cathedra;

  searchTypeList = ['by teacher', 'by cathedra'];
  selectedSearchType = this.searchTypeList[0];

  cgwList: CombinedGw[] = [];

  constructor(private router: Router, private gwService: GraduateWorkService,
              private cathedraService: CathedraService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.dropdownCathedraRefresh();
    this.dropdownTeacherRefresh();
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


  onSubmit(): void {
    if (this.selectedSearchType === 'by teacher') {
      this.gwService.getByTeacher(this.selectedTeacher.id).pipe(take(1))
        .subscribe(data => this.cgwList = data);
    } else {
      this.gwService.getByCathedra(this.selectedCathedra.id).pipe(take(1))
        .subscribe(data => this.cgwList = data);
    }
  }

  goBack(): void {
    this.router.navigate(['graduate-works']);
  }
}
