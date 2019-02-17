import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User = new User();
  private sharedObj = new BehaviorSubject(this.user);
  public currentUserObj = this.sharedObj.asObservable();
  public authenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUserName(): Observable<any> {
    return this.http.get('//localhost:8080/name-users');
  }

  registerUser(uname: string, psw: string, email: string) {
    this.http.post('//localhost:8080/save', JSON.stringify({username: uname, password: psw, email: email}), this.httpOptions)
      .subscribe(data => console.log(data));
  }

  //User Authentication ---------------------------------------------------------
  //With JWT
  //TODO: check for password as well! (RS256)
  checkUser(uname: string, psw: string): Observable<any>  {
    return this.http.post<{access_token: string}>('//localhost:8080/find', JSON.stringify({username:uname, password:psw}), this.httpOptions)
      .pipe(tap(result => {
        if (result != null) {
        localStorage.setItem('access_token', result.access_token);
        }
      }));
      
  }
  //Without JWT:
/*
  checkUser(uname: string): Observable<any>  {
    return this.http.post('//localhost:8080/find', JSON.stringify({username:uname, password:"psw"}), this.httpOptions);
  }
*/
  assignUserData(uname: string, psw: string): boolean{
    this.checkUser(uname, psw).subscribe(data => {
      if (data != null) {
        this.authenticated = true;
        this.user = data;
        this.user.score = 0;
        this.sharedObj.next(this.user);
      }
      //console.log(this.sharedObj);
    })

    console.log("JWT assignUser(): " + localStorage.getItem('access_token'));
    console.log("authenticated assignUserData(): " + this.authenticated);
    return this.authenticated;
  }
  //---------------------------------------------------------------------------------

  logout() {
    localStorage.clear();
    this.authenticated = false;
    this.router.navigate(['/home']);
  }

  loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  updateScore(points: number){
    //this.user.score += points;
    this.sharedObj.subscribe(u => u.score+=points);
  }
}
