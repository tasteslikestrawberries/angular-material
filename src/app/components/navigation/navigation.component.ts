import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isSunIcon = false;

  @ViewChild('drawer', { static: true }) matDrawer?: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService
  ) {}

  /*isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 720px)')
  //720 is the breakpoint-on 721px the sidebar (drawer) is opened by default
  .pipe(
      map(result => result.matches),
      shareReplay(1),
  );*/

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset) //check official breakpoints and orientations
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  toggleDarkTheme(isChecked: boolean) {
    this.themeService.setDarkTheme(isChecked);
    this.isSunIcon = !this.isSunIcon;
  }
}
