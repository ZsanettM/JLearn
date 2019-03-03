import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService
  let http: HttpTestingController

  beforeEach(() =>{ TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule.withRoutes([])],
    providers: [UserService]
  })
  http = TestBed.get(HttpTestingController)
  service = TestBed.get(UserService)
});

const dummyUsers = [
  {userName: 'Tester2', uid: '99', password:'This8ntwk', avatar: '	../../assets/katie.png'},
  {userName: 'Tester3', uid: '100', password:'This8ntwk', avatar: '	../../assets/katie.png'}
]

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });

  it('should log user in with correct credentials', () =>{    
   
    service.checkUser("Tester2","This8ntwk").subscribe(result => {
      expect(result).toEqual(dummyUsers[0]);
    });

    const req = http.expectOne('//localhost:8080/find');
    expect(req.request.method).toBe("POST");

    dummyUsers.forEach(user => {
      if (user.userName == "Tester2" && user.password == "This8ntwk"){
        req.flush(user)
      }
    })
  })

  it('shouldn\'t log user in with incorrect credentials', () =>{
    
    service.checkUser("Somename","ThisIsNotARealPsw0").subscribe(result => {
      expect(result).toBeFalsy();
    });

    const req = http.expectOne('//localhost:8080/find');
    expect(req.request.method).toBe("POST");

    dummyUsers.forEach(user => {
      if (user.userName == "Somename" && user.password == "ThisIsNotARealPsw0"){
        req.flush(user)
      }
    })
    req.flush(null)
  })
});
