import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private url =
    'https://angular-material-ba815-default-rtdb.europe-west1.firebasedatabase.app/users/.json';
  users: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get(this.url)
      .pipe(
        map((data:any) => Object.keys(data).forEach((key) => this.users.push({id: key, ...data[key]})))
      )
      .subscribe();
  }
}
