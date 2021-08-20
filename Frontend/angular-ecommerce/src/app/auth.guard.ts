import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private securityService : SecurityService,
              private router : Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securityService.isLoggedIn()){
<<<<<<< HEAD
      console.log('i am logged in');
      return true;
    } else{
      console.log('i am out');
=======
      return true;
    } else{
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
      this.router.navigate(['/login']);
      return false;
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
}
