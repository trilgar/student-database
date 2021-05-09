import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Faculty, FacultyService} from "../../services/faculty/faculty.service";
import {Cathedra} from "../../services/cathedra/cathedra.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.css']
})
export class CreateFacultyComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  selectedName = 'new faculty';
  constructor(private router: Router, private facultyService: FacultyService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['faculties']);
  }

  onSubmit(): void {
    const faculty = new Faculty();
    faculty.name = this.selectedName;
    this.facultyService.create(faculty)
      .pipe(take(1))
      .subscribe(data => this.goBack(), error => {
        console.log('error: ', error.error.message);
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }
}
