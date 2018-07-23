import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: object) {
    this.userSource.next(user);
  }
}
