import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../../services/student/student.service';
import {take} from 'rxjs/operators';
import {GroupService} from '../../services/group/group.service';
import {Gender} from "../../models/Student";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './student-advanced-search.component.html',
  styleUrls: ['./student-advanced-search.component.css']
})
export class StudentAdvancedSearchComponent implements OnInit {
  listGroups = [];
  listCourses = [];
  genderList = [Gender.MALE, Gender.FEMALE];
  warningMessage: string;
  filtersList = ['select by gender', 'select by age', 'select by year', 'select by kids', 'select by stipendium'];
  searchTypeList = ['Group', 'Course'];
  courseList = [1, 2, 3, 4, 5];

  selectedSearchType = 'Group';
  selectedGroups = [];
  selectedCourses = [];
  selectedFilters = [];

  gender = Gender.MALE;
  ageFrom = 0;
  ageTo = 0;
  yearFrom = 0;
  yearTo = 0;
  stipendiumFrom = 0;
  stipendiumTo = 0;
  kids = 'has kids';


  constructor(private router: Router, private stdService: StudentService,
              private grpService: GroupService) {
  }

  ngOnInit(): void {
    this.dropdownGroupRefresh();
  }

  dropdownGroupRefresh(): void {
    this.grpService.getGroupsByName('')
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.listGroups = data;
      });
  }

  show(): void {
    console.log(this.selectedGroups);
  }

  goBack(): void {
    this.router.navigate(['students']);
  }
}
