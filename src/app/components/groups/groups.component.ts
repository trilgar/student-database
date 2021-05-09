import { Component, OnInit } from '@angular/core';
import {Group} from "../create-student/create-student.component";
import {Router} from "@angular/router";
import {GroupService} from "../../services/group/group.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  warningMessage: string;
  warningFlag = false;
  groupList: Group[] = [];
  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit(): void {
    this.getByName('');
  }

  delete(id: number): void {
    this.groupService.delete(id)
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
    this.router.navigate(['groups/create']);
  }

  getByName(name: string): void {
    this.groupService.getGroupsByName(name).pipe(take(1)).subscribe(data => this.groupList = data);
  }
}
