import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Exam, ExamService} from "../../services/exam/exam.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  exams: Exam[] = [];

  constructor(private router: Router, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getByDescription('');
  }

  delete(id: number): void {
    this.examService.delete(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.getByDescription('');
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

  getByDescription(name: string): void {
    this.examService.getByName(name).pipe(take(1)).subscribe(data => this.exams = data);
  }

  create(): void {
    this.router.navigate(['exams/create']);
  }
}
