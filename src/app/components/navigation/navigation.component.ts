import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isDarkTheme?: Observable<boolean>;
  isSunIcon = false;

  constructor(private breakpointObserver: BreakpointObserver, private themeService: ThemeService) { }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    this.isSunIcon = !this.isSunIcon ;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
