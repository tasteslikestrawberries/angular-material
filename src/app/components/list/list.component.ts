import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../models/IUser';
import { UserService } from 'src/app/services/user.service';
import { catchError, mapTo, Observable, of, startWith, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IUser[]>;
  results?: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users$ = this.userService.getUsers().pipe(
      tap( data => {
        this.results = data;
        this.dataSource = new MatTableDataSource(this.results);
        this.dataSource.paginator = this.paginator;
      })
    );

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
