import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../../services/student/student.service';
import {take} from 'rxjs/operators';
import {GroupService} from '../../services/group/group.service';
import {Gender} from '../../models/Student';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './student-advanced-search.component.html',
  styleUrls: ['./student-advanced-search.component.css']
})
export class StudentAdvancedSearchComponent implements OnInit {
  listGroups = [];
  genderList = [Gender.MALE, Gender.FEMALE];
  warningMessage: string;
  filtersList = ['select by gender', 'select by age', 'select by year', 'select by kids', 'select by stipendium', 'select by name'];
  searchTypeList = ['Group', 'Course'];
  courseList = [1, 2, 3, 4, 5];
  detailsId: number;
  selectedSearchType = 'Group';
  selectedGroups = [];
  selectedCourses = [];
  selectedFilters = [];

  name = '';
  gender = Gender.MALE;
  ageFrom = 0;
  ageTo = 0;
  yearFrom = 0;
  yearTo = 0;
  stipendiumFrom = 0;
  stipendiumTo = 0;
  kids = 'has kids';

  students = [];
  totalNumber: number;

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

  onSubmit(): void {
    const searchDto = new SearchDto();
    if (this.selectedFilters.length !== 0) {
      searchDto.filters = new Map<string, any>();
    }
    this.selectedFilters.map((filterName) => {
      switch (filterName) {
        case 'select by gender': {
          searchDto.filters['gender'] = this.gender;
          break;
        }
        case 'select by age': {
          searchDto.filters['age'] = new Interval(this.ageFrom, this.ageTo);
          break;
        }
        case 'select by year': {
          searchDto.filters['year'] = new Interval(this.yearFrom, this.yearTo);
          break;
        }
        case 'select by kids': {
          searchDto.filters['kids'] = null;
          break;
        }
        case 'select by stipendium': {
          searchDto.filters['stipendium'] = new Interval(this.stipendiumFrom, this.stipendiumTo);
          break;
        }
        case 'select by name': {
          searchDto.filters['name'] = this.name;
        }
      }
    });
    if (this.selectedSearchType === 'Group') {
      searchDto.mainSearchCriteria = this.selectedGroups.map((group) => {
        return group.name;
      });
      console.log(searchDto);
      this.stdService.getByGroup(searchDto)
        .pipe(take(1))
        .subscribe(data => {
          this.students = data;
          this.totalNumber = data.length;
        });
    } else {
      searchDto.mainSearchCriteria = this.selectedCourses;
      console.log(searchDto);
      this.stdService.getByCourse(searchDto)
        .pipe(take(1))
        .subscribe(data => {
          this.students = data;
          this.totalNumber = data.length;
        });
    }

  }

  deleteStudent(id: number): void {
    this.stdService.deleteStudent(id)
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

export class SearchDto {
  mainSearchCriteria: Array<any>;
  filters = {};
}

export class Interval {
  from: number;
  to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
}
