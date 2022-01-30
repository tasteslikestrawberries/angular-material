import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/IUser';
import { UserService } from 'src/app/services/user.service';
import { catchError, delay, mapTo, Observable, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users$!: Observable<IUser[]>;
  isLoading$?: Observable<boolean>;
  error$?: Observable<Error | false>;

  displayedColumns = ['idx', 'name', 'email', 'phone', 'date'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users$ = this.userService.getUsers();

    /*startWith returns an observable that, at the moment of subscription, will synchronously emit
     all values provided to this operator, then subscribe to the source and mirror all of its emissions to subscribers.*/

    /*mapTo transforms that first, startWith's true value to false (spinner appears, then disappears
      when the other stream values start emitting) and for all the emitted values, stays false. In case of an error, the returned
      value is false (so the spinner is gone).
      )*/
    this.isLoading$ = this.users$.pipe(
      mapTo(false),
      startWith(true),
      catchError((err) => of(false))
    );

    this.error$ = this.users$.pipe(
      mapTo(false),
      catchError((err) => of(err))
    );
  }
}
