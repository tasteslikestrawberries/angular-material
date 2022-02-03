import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from '../../shared/models/IUser';
import { UserService } from 'src/app/shared/services/user.service';
import { catchError, mapTo, Observable, of, startWith, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { sort as compare } from 'src/app/utilities/helper-functions/sort';

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
  displayedColumns = ['idx', 'name', 'email', 'phone', 'date', 'delete'];

  //PAGINATOR
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IUser[]>;
  results?: any;

  //SEARCH
  input = '';
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;

  //MAT SORT
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  resetDataSource() {
    this.dataSource = new MatTableDataSource(this.results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUsers() {
    this.users$ = this.userService.getUsers().pipe(
      tap((data) => {
        this.results = data;
        this.resetDataSource();
      })
    );

    /*startWith returns an observable that, at the moment of subscription, will synchronously emit
     all values provided to this operator, then subscribe to the source and mirror all of its emissions to subscribers.*/

    /*mapTo transforms stream values, so in this case it must be put before startWith, because, if put first,
     it would transform its value to false (the spinner wouldn't show on start). 
     The startWith value always emits first, then the (users$) stream begins and mapTo will map the spinner to false.
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

  deleteUser(id: string) {
    this.userService.deleteUser(id);
    this.results = this.results.filter((result: IUser) => result.id !== id);
    this.resetDataSource();
  }

  onSearch() {
    this.input = this.searchBox.nativeElement.value;
    if (!this.results) return;

    this.dataSource = this.results.filter((result: IUser) => {
      if (result.name.toLowerCase().includes(this.input.toLowerCase()))
        return true;
      if (result.email.toLowerCase().includes(this.input.toLowerCase()))
        return true;
      return false;
    });
  }

  onClearInput() {
    console.log(this.input);
    if (this.searchBox.nativeElement.value === '') {
      this.resetDataSource();
    }
  }

  sortData(sort: Sort) {
    const data = this.results.slice();
    if (!sort.active || sort.direction === '') {
      this.results = data;
      return;
    }

    this.results = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      if (sort.active) return compare(a, b, isAsc);
      return 0;
    });
  }
}
