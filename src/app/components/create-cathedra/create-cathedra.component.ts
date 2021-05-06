import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cathedra, CathedraService} from '../../services/cathedra/cathedra.service';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-create-cathedra',
  templateUrl: './create-cathedra.component.html',
  styleUrls: ['./create-cathedra.component.css']
})
export class CreateCathedraComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  selectedName = 'new cathedra';

  constructor(private router: Router, private cathedraService: CathedraService) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['cathedras']);
  }

  onSubmit(): void {
    const cathedra = new Cathedra();
    cathedra.name = this.selectedName;
    this.cathedraService.create(cathedra)
      .pipe(take(1))
      .subscribe(data => this.goBack(), error => {
        console.log('error: ', error.error.message);
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }
}
