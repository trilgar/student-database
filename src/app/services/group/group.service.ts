import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../../components/create-student/create-student.component';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getGroupsByName(name: string): Observable<Group[]> {
    const url = `${environment.backend_url}/api/groups/by_name?name=${name}`;
    console.log('Sending request to:', url);
    return this.http.get<Group[]>(url);
  }
}
