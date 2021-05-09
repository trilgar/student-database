import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GraduateWork, GraduateWorkService} from "../../services/graduate-work/graduate-work.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-graduate-work',
  templateUrl: './graduate-work.component.html',
  styleUrls: ['./graduate-work.component.css']
})
export class GraduateWorkComponent implements OnInit {
  graduateWorks: GraduateWork[] = [];
  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  constructor(private router: Router, private gwService: GraduateWorkService) {
  }

  ngOnInit(): void {
    this.getByName('');
  }

  getByName(name: string): void {
    this.gwService.getByName(name).pipe(take(1)).subscribe(data => this.graduateWorks = data);
  }

  delete(id: number): void {
    this.gwService.delete(id)
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

  showDetails(id: number): void {
    if (this.detailsId === id) {
      this.detailsId = -1;
    } else {
      this.detailsId = id;
    }
  }

  advancedSearch(): void {
    this.router.navigate(['graduate-works/advanced-search']);
  }

  create(): void {
    this.router.navigate(['graduate-works/create']);
  }
}

