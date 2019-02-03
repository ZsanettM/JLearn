import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*console.log("username: "+ this.user.username)
    console.log("password: "+ this.user.psw)
    console.log("score: "+ this.user.score)*/
  }

  logout() {
    this.showName = false;
    this.username = '';
    this.password = '';
  }

  onSubmit() {
   if (this.userService.assignUserData(this.username)){
      this.userService.currentUserObj.subscribe(object => this.user = object);
      console.log(this.user.score)
      this.showName = true;     
    }
    
  }

}
