import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Faculty, FacultyService} from '../../services/faculty/faculty.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  faculties: Faculty[] = [];

  constructor(private router: Router, private facultyService: FacultyService) {
  }

  ngOnInit(): void {
    this.getByName('');
  }

  delete(id: number): void {
    this.facultyService.delete(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.getByName('');
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });

  }

  create(): void {
    this.router.navigate(['faculties/create']);
  }

  getByName(name: string): void {
    this.facultyService.getFacultiesByName(name).pipe(take(1)).subscribe(data => this.faculties = data);
  }

}
