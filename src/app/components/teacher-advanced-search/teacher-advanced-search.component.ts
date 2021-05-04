import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Gender} from "../../models/Student";
import {Teacher, TeacherCategory, TeacherService} from "../../services/teacher/teacher.service";
import {Interval, SearchDto} from "../advanced-search/student-advanced-search.component";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {Cathedra, CathedraService} from "../../services/cathedra/cathedra.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-teacher-advanced-search',
  templateUrl: './teacher-advanced-search.component.html',
  styleUrls: ['./teacher-advanced-search.component.css']
})
export class TeacherAdvancedSearchComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;

  genderList = [Gender.FEMALE, Gender.MALE];
  filtersList = ['select by gender', 'select by age', 'select by year', 'select by kids', 'select by wage',
    'select by name', 'select by aspirant', 'select by science works', 'select by category'];
  categoryList = [TeacherCategory.Assistant, TeacherCategory.Lecturer,
    TeacherCategory.SeniorLecturer, TeacherCategory.Docent, TeacherCategory.Professor];
  facultyList: Faculty[];
  cathedraList: Cathedra[];

  selectedName = '';
  selectedGender = Gender.MALE;
  selectedYear = new Interval(0, 2020);
  selectedAge = new Interval(0, 60);
  selectedKids = new Interval(0, 10);
  selectedWage = new Interval(0, 10000);
  selectedSw = new Interval(0, 2020);

  searchTypeList = ['Faculty', 'Cathedra'];
  selectedSearchType = 'Faculty';
  selectedFaculties = [];
  selectedCathedras = [];
  selectedFilters = [];
  selectedCategories: TeacherCategory[];

  teachers: Teacher[] = [];
  detailsId = -1;

  constructor(private router: Router, private facultyService: FacultyService,
              private cathedraService: CathedraService, private teacherService: TeacherService) {
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

  onSubmit(): void {
    const searchDto = new SearchDto();
    if (this.selectedFilters.length !== 0) {
      searchDto.filters = new Map<string, any>();
    }
    this.selectedFilters.map((filterName) => {
      switch (filterName) {
        case 'select by gender': {
          searchDto.filters['gender'] = this.selectedGender;
          break;
        }
        case 'select by age': {
          searchDto.filters['age'] = this.selectedAge;
          break;
        }
        case 'select by year': {
          searchDto.filters['year'] = this.selectedYear;
          break;
        }
        case 'select by kids': {
          searchDto.filters['kids'] = this.selectedKids;
          break;
        }
        case 'select by wage': {
          searchDto.filters['wage'] = this.selectedWage;
          break;
        }
        case 'select by name': {
          searchDto.filters['name'] = this.selectedName;
          break;
        }
        case 'select by aspirant': {
          searchDto.filters['isAsp'] = null;
          break;
        }
        case 'select by science works': {
          searchDto.filters['sw'] = this.selectedSw;
          break;
        }
        case 'select by category': {
          searchDto.filters['category'] = this.selectedCategories;
          break;
        }
      }
    });
    if (this.selectedSearchType === 'Faculty') {
      searchDto.mainSearchCriteria = this.selectedFaculties.map(faculty => faculty.name);
      console.log(searchDto);
      this.teacherService.getByFaculty(searchDto)
        .pipe(take(1))
        .subscribe(data => this.teachers = data);
    } else {
      searchDto.mainSearchCriteria = this.selectedCathedras.map(cathedra => cathedra.name);
      console.log(searchDto);
      this.teacherService.getByCathedra(searchDto)
        .pipe(take(1))
        .subscribe(data => this.teachers = data);
    }
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
}
