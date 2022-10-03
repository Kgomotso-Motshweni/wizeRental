import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //if user is logged in (true) prevent them from routing back to login and register
      if (this.authService.isLoggedIn == true) {
        let role = localStorage.getItem('role');
        if(role == 'Landlord'){
          this.router.navigate(['/landlord/'])
        }else if(role == 'Tenant'){
          this.router.navigate(['/tenant/home'])
        }
      }
    
    return true;
  }
  
}
