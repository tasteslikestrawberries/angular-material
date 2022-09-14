import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logger } from '../custom-decorators/Logger';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  fromEvent,
  ignoreElements,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  throttleTime,
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
  @ViewChild('myButton', { static: false }) myButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('myInput', { static: false }) myInput!: ElementRef<HTMLInputElement>;

  //activity
  activity$!: Observable<IActivity>;
  url = 'https://www.boredapi.com/api/activity';
  error$ = new Subject<boolean>();

  // user
  user$!: Observable<any>;
  url2 = 'https://randomuser.me/api';
  error2$!: Observable<boolean>;

  //logging
  count!: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadActivity();
    this.loadUser();
  }

  loadActivity() {
    //this.activity$ = from(Promise.reject(1))
    this.activity$ = this.http.get<IActivity>(this.url).pipe(
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
      switchMap((data: any) =>
        data.error ? throwError(() => new Error()) : of(data)
      ),
      catchError((err) => {
        this.error$.next(true);
        return EMPTY;
      })
      //catchError(this.errorHandler.bind(this))
    );
  }

  //with error handling method
  /*errorHandler() {
    this.error$.next(true);
    return EMPTY //replaces the error obs with new replacement empty obs that completes
  }*/

  loadUser() {
    this.user$ = this.http
      .get(this.url2)
      .pipe(map((data: any) => data.results[0]));

    this.error2$ = this.user$.pipe(
      ignoreElements(), //ignores all emissions except error and complete (doesn't call next)
      catchError((err) => of(err))
    );
  }

  @Logger('click, ', 'load user', { count: 0 }) //TODO
  onBtnClick(count: number) {
    this.loadUser();
    count++;
  }

  testOperators(e: MouseEvent) {
    const clicks$ = fromEvent(this.myButton.nativeElement, 'click');
    clicks$.pipe(
      debounceTime(500))
      .subscribe((v) => console.log(v));
  }

  testInput(e: any) {
    const inputs$ = fromEvent(this.myInput.nativeElement, 'keyup');
    inputs$.pipe(
      throttleTime(500),
      distinctUntilChanged()
    ).subscribe((v: any) => console.log(v.key));
  }
}
