import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logger } from '../custom-decorators/Logger';
import {
  catchError,
  EMPTY,
  ignoreElements,
  map,
  Observable,
  of,
  Subject,
  switchMap,
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
  //activity
  activity$!: Observable<IActivity>;
  url = 'https://www.boredapi.com/api/activity';
  error$ = new Subject<boolean>();

  // user
  user$!: Observable<any>;
  url2 = 'https://randomuser.me/api';
  error2$!: Observable<boolean>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadActivity();
    //this.loadUser();
  }

  loadActivity() {
    //this.activity$ = from(Promise.reject(1))
    this.activity$ = this.http.get<IActivity>(this.url)
      .pipe(
        /*tap((data: any) => {
          if (data.error) {
            throw new Error(data.error);
          }
        }),*/
        /*   map((data: any) => {
          if (data.error) {
            throw new Error
          } else return data
        }),*/
        switchMap((data: any) => data.error ? throwError(() => new Error) : of(data)),
        catchError(err => {
          this.error$.next(true);
          return EMPTY
        })
        //catchError(this.errorHandler.bind(this))
      )
  }

  //with error handling method
  /*errorHandler() {
    this.error$.next(true);
    return EMPTY //replaces the error obs with new replacement empty obs that completes
  }*/

  @Logger()
  loadUser() {
    this.user$ = this.http
      .get(this.url2)
      .pipe(map((data: any) => data.results[0]))

    this.error2$ = this.user$.pipe(
      ignoreElements(), //ignores all emissions except error and complete (doesn't call next)
      catchError((err) => of(err))
    );
  }


}
