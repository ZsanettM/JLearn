import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: User

  constructor(private http: HttpClient) { }

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUserName(): Observable<any> {
    return this.http.get('//localhost:8080/name-users');
  }

  checkUser(uname: string): Observable<any>  {
    return this.http.put('//localhost:8080/find', JSON.stringify({username:uname, password:"psw"}), this.httpOptions);
  }
}
