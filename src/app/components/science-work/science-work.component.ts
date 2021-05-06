import {Component, OnInit} from '@angular/core';
import {ScienceWork, ScienceWorkService} from "../../services/science-work/science-work.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-science-work',
  templateUrl: './science-work.component.html',
  styleUrls: ['./science-work.component.css']
})
export class ScienceWorkComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  detailsId = -1;

  sWorks: ScienceWork[] = [];


  constructor(private router: Router, private swService: ScienceWorkService) {
  }

  ngOnInit(): void {
    this.refreshScienceWorks('');
  }

  refreshScienceWorks(name: string): void {
    this.swService.getByName(name)
      .pipe(take(1))
      .subscribe(data => this.sWorks = data);
  }

  deleteSw(id: number): void {
    this.swService.delete(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.refreshScienceWorks('');
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });
  }
  advancedSearch(): void {
    this.router.navigate(['science-works/advanced-search']);
  }

  createNew(): void {
    this.router.navigate(['science-works/create-new']);
  }
  showDetails(id: number): void {
    if (this.detailsId === id) {
      this.detailsId = -1;
    } else {
      this.detailsId = id;
    }
  }
}
