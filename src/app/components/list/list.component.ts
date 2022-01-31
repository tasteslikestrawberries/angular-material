import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../models/IUser';
import { UserService } from 'src/app/services/user.service';
import { catchError, mapTo, Observable, of, startWith, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users$!: Observable<IUser[]>;
  isLoading$?: Observable<boolean>;
  error$?: Observable<Error | false>;

  //TABLE
  displayedColumns = ['idx', 'name', 'email', 'phone', 'date'];

  //PAGINATOR
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IUser[]>;
  results?: any;

  //MAT SORT
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users$ = this.userService.getUsers().pipe(
      tap((data) => {
        this.results = data;
        this.dataSource = new MatTableDataSource(this.results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  sortData(sort: Sort) {
    const data = this.results.slice();
    if (!sort.active || sort.direction === '') {
      this.results = data;
      return;
    }

    this.results = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
