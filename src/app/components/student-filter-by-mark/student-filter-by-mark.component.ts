import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Discipline, DisciplineService} from "../../services/discipline/discipline.service";
import {StudentService} from "../../services/student/student.service";
import {Group} from "../create-student/create-student.component";
import {take} from "rxjs/operators";
import {GroupService} from "../../services/group/group.service";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {CourseService} from "../../services/course/course.service";

@Component({
  selector: 'app-student-filter-by-mark',
  templateUrl: './student-filter-by-mark.component.html',
  styleUrls: ['./student-filter-by-mark.component.css']
})
export class StudentFilterByMarkComponent implements OnInit {

  warningMessage: string;

  selectedSearchType: 'by discipline';
  searchTypeList = ['by discipline', 'by faculty'];

  listGroups: Group[];
  listFaculties: Faculty[];
  listDisciplines: Discipline[];

  selectedGroups = [];
  selectedFaculty: number;
  selectedDiscipline = -1;
  selectedMark = 5;

  students = [];
  detailsId = -1;

  constructor(private router: Router, private disciplineService: DisciplineService,
              private studentService: StudentService, private grpService: GroupService,
              private facultyService: FacultyService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.dropdownGroupRefresh();
    this.dropdownDisciplineRefresh();
    this.dropdownFacultyRefresh();
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

  dropdownFacultyRefresh(): void {
    this.facultyService.getFacultiesByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.listFaculties = data;
      });
  }

  dropdownDisciplineRefresh(): void {
    this.disciplineService.getByName('')
      .pipe(take(1))
      .subscribe(data => {
        this.listDisciplines = data;
      });
  }

  disciplineDropdownActualise(): void {
    this.disciplineService.getByGroups(this.selectedGroups)
      .pipe(take(1))
      .subscribe(data => this.listDisciplines = data);
  }

  onSubmit(): void {
    console.log(this.selectedGroups);
    this.studentService.getByDiscipline(this.selectedGroups, this.selectedDiscipline, this.selectedMark)
      .pipe(take(1))
      .subscribe(data => this.students = data);
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
