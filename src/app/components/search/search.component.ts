import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/shared/models/IUser';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  users: IUser[] = [];
  input = '';
  searchResults?: IUser[];

  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => (this.users = data),
    });
  }

  onSearch() {
    this.input = this.searchBox.nativeElement.value;
    if (!this.users) return;

    this.searchResults = this.users.filter((user) => {
      if (user.name.toLowerCase().includes(this.input.toLowerCase()))
        return true;
      if (user.email.toLowerCase().includes(this.input.toLowerCase()))
        return true;
      return false;
    });
  }
}
