import { Component } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme?: Observable<boolean>;
  title = 'angular-material';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  //just for testing purposes
  addNumbers = (a:number,b:number) => a + b;
}
