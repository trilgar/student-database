import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ScienceWork, ScienceWorkService, SwType} from "../../services/science-work/science-work.service";
import {Teacher, TeacherCategory, TeacherService} from "../../services/teacher/teacher.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-create-science-work',
  templateUrl: './create-science-work.component.html',
  styleUrls: ['./create-science-work.component.css']
})
export class CreateScienceWorkComponent implements OnInit {

  warningMessage: string;
  warningFlag = false;

  typeList = [SwType.CandidateWork, SwType.DissertationWork];
  selectedType: SwType;

  teacherList: Teacher[];
  selectedTeacher: Teacher;

  selectedYear: number;
  selectedName = 'new name';
  selectedDescription = 'description';


  constructor(private router: Router, private swService: ScienceWorkService,
              private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.teacherDropdownRefresh();
  }

  teacherDropdownRefresh(): void {
    this.teacherService.getByName('')
      .pipe(take(1))
      .subscribe(data => this.teacherList = data);
  }

  goBack(): void {
    this.router.navigate(['science-works']);
  }

  onSubmit(): void {
    const sw = new ScienceWork();
    sw.type = this.selectedType;
    sw.idTeacher = this.selectedTeacher.id;
    sw.year = this.selectedYear;
    sw.name = this.selectedName;
    sw.description = this.selectedDescription;
    this.swService.create(sw)
      .pipe(take(1)).subscribe(data => this.goBack(), error => {
      console.log('error', error.error.message);
      this.warningMessage = error.error.message;
      this.warningFlag = true;
    });
  }

  verifySwType(): void {
    if (this.selectedTeacher == null) {
      return;
    }
    if (this.selectedTeacher.category !== TeacherCategory.Docent && this.selectedTeacher.category !== TeacherCategory.Professor) {
      this.selectedType = SwType.CandidateWork;
      this.typeList = [SwType.CandidateWork];
    } else {
      this.typeList = [SwType.CandidateWork, SwType.DissertationWork];
    }
  }
}
