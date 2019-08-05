import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
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

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.user.pipe(
             take(1),
             map(user => !!user),
             tap(loggedIn => {
               if (!loggedIn) {
                 console.log('access denied');
                 this.router.navigate(['/auth']);
               }
           })
      );
}
}
