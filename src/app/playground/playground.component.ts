import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  mapTo,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

interface IActivity {
  activity: string;
  type: string;
  link: string;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  $activity!: Observable<IActivity>;
  url = 'https://www.boredapi.com/api/activity';

  url2 = 'https://randomuser.me/api';
  $user!: Observable<any>;

  $error!: Observable<boolean>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadActivity();
    this.loadUser();
  }

  loadActivity() {
    this.$activity = this.http.get<IActivity>(this.url);
    this.$error  = this.$activity.pipe(catchError((err) => of(true)), mapTo(false));

  }

  loadUser() {
    this.$user = this.http.get(this.url2).pipe(
      //tap((data) => console.log(data)),
      map((data: any) => data.results[0])
    );
  }
}
