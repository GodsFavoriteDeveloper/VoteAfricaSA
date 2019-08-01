import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
    ) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]):
    Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.userAuthenticated) {
        this.router.navigateByUrl('/auth');
      }
      return this.authService.userAuthenticated;
    }
}
