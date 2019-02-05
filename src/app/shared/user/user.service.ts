import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User = new User()
  private sharedObj = new BehaviorSubject(this.user);
  public currentUserObj = this.sharedObj.asObservable();
  public authenticated: boolean = false;

  constructor(private http: HttpClient) { }

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUserName(): Observable<any> {
    return this.http.get('//localhost:8080/name-users');
  }
  //User Authentication ---------------------------------------------------------
  //With JWT
  //TODO: check for password as well! (RS256)
  checkUser(uname: string): Observable<any>  {
    return this.http.post<{access_token: string}>('//localhost:8080/find', JSON.stringify({username:uname, password:"psw"}), this.httpOptions)
      .pipe(tap(result => {
        localStorage.setItem('access_token', result.access_token);
      }));
      
  }
  //Without JWT:
/*
  checkUser(uname: string): Observable<any>  {
    return this.http.post('//localhost:8080/find', JSON.stringify({username:uname, password:"psw"}), this.httpOptions);
  }
*/
  assignUserData(uname: string): boolean{
    this.checkUser(uname).subscribe(data => {
      if (data) {this.authenticated = true;}
      console.log("authenticated: "+ this.authenticated);
      this.user = data;
      this.user.score = 0;
      this.sharedObj.next(this.user);
    })

    console.log("JWT assignUser(): " + localStorage.getItem('access_token'));
    return true;
  }
  //---------------------------------------------------------------------------------

  logout() {
    localStorage.removeItem('access_token');
  }

  loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  updateScore(points: number){
    //this.user.score += points;
    this.sharedObj.subscribe(u => u.score+=points);
  }
}
