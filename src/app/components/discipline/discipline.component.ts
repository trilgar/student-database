import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Discipline, DisciplineService} from "../../services/discipline/discipline.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {

  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  disciplines: Discipline[] = [];


  constructor(private router: Router, private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.getByName('');
  }

  getByName(name: string): void {
    this.disciplineService.getByName(name).pipe(take(1)).subscribe(data => this.disciplines = data);
  }

  goBack(): void {
    this.router.navigate(['disciplines']);
  }

  delete(id: number): void {
    this.disciplineService.delete(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.getByName('');
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

  create(): void {
    this.router.navigate(['disciplines/create']);
  }
}
