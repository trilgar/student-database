import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Teacher, TeacherService} from "../../services/teacher/teacher.service";
import {GroupService} from "../../services/group/group.service";
import {Discipline, DisciplineService, DType} from "../../services/discipline/discipline.service";
import {take} from "rxjs/operators";
import {Group} from "../create-student/create-student.component";

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit {
  dTypeList = [DType.Seminar, DType.Lection, DType.LabWork, DType.CourseWork, DType.Consultancy];
  teacherList: Teacher[];
  groupList: Group[];

  newDiscipline: Discipline = {
    id: null,
    type: DType.Seminar,
    idTeacher: null,
    idGroup: null,
    name: 'new name',
    hours: 120,
    course: 1,
    semester: 1
  };
  warningMessage: string;
  warningFlag = false;

  constructor(private router: Router, private teacherService: TeacherService,
              private groupService: GroupService, private  disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.dropdownGroupRefresh();
    this.dropdownTeacherRefresh();
  }

  goBack(): void {
    this.router.navigate(['disciplines']);
  }

  dropdownTeacherRefresh(): void {
    this.teacherService.getByName('').pipe(take(1))
      .subscribe(data => this.teacherList = data, error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }

  dropdownGroupRefresh(): void {
    this.groupService.getGroupsByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.groupList = data;
      });
  }

  onSubmit(): void {
    this.disciplineService.create(this.newDiscipline)
      .pipe(take(1)).subscribe(data => this.goBack(), error => {
      this.warningMessage = error.error.message;
      this.warningFlag = true;
    });
  }
}
