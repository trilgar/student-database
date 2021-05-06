import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cathedra, CathedraService} from '../../services/cathedra/cathedra.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-cathedra',
  templateUrl: './cathedra.component.html',
  styleUrls: ['./cathedra.component.css']
})
export class CathedraComponent implements OnInit {

  warningMessage: string;
  warningFlag = false;

  cathedras: Cathedra[] = [];

  constructor(private router: Router, private cathedraService: CathedraService) {
  }

  ngOnInit(): void {
    this.refreshCathedras('');
  }

  refreshCathedras(name: string): void {
    this.cathedraService.getByName(name)
      .pipe(take(1))
      .subscribe(data => this.cathedras = data);
  }

  deleteCathedra(id: number): void {
    this.cathedraService.deleteCathedra(id)
      .pipe(take(1))
      .subscribe((data) => {
          console.log('deleteStatus: ', data.status);
          this.refreshCathedras('');
        },
        error => {
          console.log('error:', error);
          this.warningMessage = error.error.message;
          this.warningFlag = true;
        });

  }

  advancedSearch(): void {
    this.router.navigate(['cathedras/advanced-search']);
  }

  createNew(): void {
    this.router.navigate(['cathedras/create-new']);
  }

}
