import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new BehaviorSubject<IUser[]>([]);
  users$ = this.subject.asObservable();
  private url =
    'https://angular-material-ba815-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<Record<string, IUser>>(this.url).pipe(
      map((data) =>
        Object.entries(data).map(([id, user]) => {
          return { id: id, ...user };
        })
      )
    );
  }

  addUser(user: IUser) {
    this.http.post<IUser>(this.url, user).subscribe();
  }

  deleteUser(id: string) {
    this.http.delete<IUser>(`https://angular-material-ba815-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
  }

}
