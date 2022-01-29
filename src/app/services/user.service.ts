import { Injectable } from '@angular/core';
import { IUser } from '../components/models/IUser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject<IUser[]>([]);
  private users$ = this.users.asObservable();
  private url = 'https://angular-material-ba815-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<IUser[]>(this.url)
  }

  addUser(user: IUser){
    return this.http.post<IUser>(this.url, user)
  }
  
}
