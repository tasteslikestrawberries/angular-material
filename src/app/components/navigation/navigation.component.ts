import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/theme.service';
import { MatSidenav } from '@angular/material/sidenav';
import { tap } from 'rxjs';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isSunIcon = false;

  @ViewChild('drawer', {static: true}) matDrawer?: MatSidenav;

  constructor(private themeService: ThemeService) { }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    this.isSunIcon = !this.isSunIcon ;
  }

    closeSidebar() {
       this.matDrawer?.close();
   }

}
