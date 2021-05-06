import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Cathedra, CathedraService} from "../../services/cathedra/cathedra.service";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {ScienceWork, ScienceWorkService} from "../../services/science-work/science-work.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-science-work-advanced-search',
  templateUrl: './science-work-advanced-search.component.html',
  styleUrls: ['./science-work-advanced-search.component.css']
})
export class ScienceWorkAdvancedSearchComponent implements OnInit {

  cathedraList: Cathedra[];
  facultyList: Faculty[];
  selectedCathedra: Cathedra;
  selectedFaculty: Faculty;

  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  swList: ScienceWork[] = [];

  constructor(private router: Router, private cathedraService: CathedraService,
              private facultyService: FacultyService, private swService: ScienceWorkService) {
  }


  ngOnInit(): void {
    this.dropdownCathedraRefresh();
    this.dropdownFacultyRefresh();
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

  goBack(): void {
    this.router.navigate(['science-works']);
  }

  delete(id: number): void {
    this.swService.delete(id)
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

  onSubmit(): void {
    this.swService.getByFilters(this.selectedCathedra.id, this.selectedFaculty.id)
      .pipe(take(1)).subscribe(data => this.swList = data);
  }
}

