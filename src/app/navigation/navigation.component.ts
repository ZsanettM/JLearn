import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: User = new User()
  showName: boolean
  username: string
  password: string
  score: number =5;

  //registration form elements
  regForm: FormGroup;
  rName: string;
  rEmail: string;
  rPsw: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*this.regForm = new FormGroup({
      'rPsw': new FormControl(this.rPsw, Validators.pattern('([a-z]+[A-Z]+[0-9]+)'))
    });*/
    if (this.userService.loggedIn()) {
      this.user.username = localStorage.getItem("userName");
      this.user.score = Number(localStorage.getItem("userScore"));
      this.showName = true;   
    }
    else {
      this.showName = false;
    }
    console.log("The user onInit: ",this.user)
    console.log("JWT onInit(): " + localStorage.getItem('access_token'));
  }

  logout() {
    this.showName = false;
    this.userService.logout();
    this.user = null;
    this.username = '';
    this.password = '';
    console.log("JWT logout(): " + localStorage.getItem('access_token'));
  }

  onSubmit() {
      //this.userService.assignUserData(this.username, this.password);
      if (this.userService.assignUserData(this.username, this.password)){
        this.userService.currentUserObj.subscribe(object => {
          this.user = object;
          localStorage.setItem("userName", this.user.username);
          localStorage.setItem("userScore", this.user.score.toString());
          localStorage.setItem("authenticated", "true")
          this.showName = true;  
        });   
      }
  }

  onRegister(){
    this.userService.registerUser(this.rName, this.rPsw, this.rEmail);
    console.log("register clicked");
  }

}
