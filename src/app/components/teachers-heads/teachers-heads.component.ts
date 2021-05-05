import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cathedra, CathedraService} from '../../services/cathedra/cathedra.service';
import {Faculty, FacultyService} from '../../services/faculty/faculty.service';
import {Teacher, TeacherCategory, TeacherService} from '../../services/teacher/teacher.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-teachers-heads',
  templateUrl: './teachers-heads.component.html',
  styleUrls: ['./teachers-heads.component.css']
})
export class TeachersHeadsComponent implements OnInit {
  cathedraList: Cathedra[];
  facultyList: Faculty[];
  selectedCathedra: Cathedra;
  selectedFaculty: Faculty;
  warningMessage: string;
  warningFlag = false;
  detailsId = -1;
  teacherTypeList = [TeacherCategory.Assistant, TeacherCategory.Professor, TeacherCategory.Docent,
    TeacherCategory.SeniorLecturer, TeacherCategory.Lecturer];
  selectedTeacherTypes = [];

  searchTypeList = ['by faculty', 'by cathedra'];
  selectedSearchType = this.searchTypeList[0];


  teachers: Teacher[] = [];

  constructor(private router: Router, private cathedraService: CathedraService,
              private facultyService: FacultyService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.dropdownCathedraRefresh();
    this.dropdownFacultyRefresh();
  }
  goBack(): void {
    this.router.navigate(['teachers']);
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
    if (this.selectedSearchType === 'by cathedra') {
      this.teacherService.getHeadsByCathedra(this.selectedTeacherTypes, this.selectedCathedra.id)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    } else {
      this.teacherService.getHeadsByFaculty(this.selectedTeacherTypes, this.selectedFaculty.id)
        .pipe(take(1)).subscribe(data => this.teachers = data);
    }

  }
}
