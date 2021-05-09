import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../services/group/group.service';
import {take} from 'rxjs/operators';
import {Group} from '../create-student/create-student.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  selectedName = 'new group';
  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.router.navigate(['groups']);
  }

  onSubmit(): void {
    const group = new Group();
    group.name = this.selectedName;
    this.groupService.create(group)
      .pipe(take(1))
      .subscribe(data => this.goBack(), error => {
        console.log('error: ', error.error.message);
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }
}
