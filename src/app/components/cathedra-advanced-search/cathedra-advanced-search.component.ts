import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../services/group/group.service';
import {Router} from '@angular/router';
import {Faculty, FacultyService} from '../../services/faculty/faculty.service';
import {Group} from '../create-student/create-student.component';
import {Interval} from '../advanced-search/student-advanced-search.component';
import {take} from 'rxjs/operators';
import {Cathedra, CathedraService} from '../../services/cathedra/cathedra.service';

@Component({
  selector: 'app-cathedra-advanced-search',
  templateUrl: './cathedra-advanced-search.component.html',
  styleUrls: ['./cathedra-advanced-search.component.css']
})
export class CathedraAdvancedSearchComponent implements OnInit {
  groupList: Group[];
  courseList: number[] = [1, 2, 3, 4, 5];
  facultyList: Faculty[];
  searchTypeList = ['Group', 'Course'];

  semester = new Interval(0, 10);
  selectedGroup: Group;
  selectedCourse: number;
  selectedFaculty: Faculty;
  selectedSearchType = 'Group';
  warningMessage: string;
  warningFlag = false;

  cathedras: Cathedra[] = [];

  constructor(private router: Router, private groupService: GroupService, private facultyService: FacultyService,
              private cathedraService: CathedraService) {
  }

  ngOnInit(): void {
    this.dropdownFacultyRefresh();
    this.dropdownGroupRefresh();
  }

  goBack(): void {
    this.router.navigate(['cathedras']);
  }

  deleteCathedra(id: number): void {
    this.cathedraService.deleteCathedra(id)
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


  private onSubmit(): void {
    if (this.selectedSearchType === 'Group') {
      this.cathedraService.getByGroup(this.selectedGroup.id, this.selectedFaculty.id, this.semester)
        .pipe(take(1)).subscribe(data => this.cathedras = data);
    } else {
      this.cathedraService.getByCourse(this.selectedCourse, this.selectedFaculty.id, this.semester)
        .pipe(take(1)).subscribe(data => this.cathedras = data);
    }
  }
}
