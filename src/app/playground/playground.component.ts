import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
  /*url = 'https://randomuser.me/api';
  user: any;
  user$!: Observable<any>;
  loading = null;*/

  $activity!: Observable<IActivity>;
  url = 'https://www.boredapi.com/api/activity'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadActivity();
  }


  loadActivity() {
    this.$activity = this.http.get<IActivity>(this.url);
  }
}
