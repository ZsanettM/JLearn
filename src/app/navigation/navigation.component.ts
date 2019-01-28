import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: any
  showName: boolean
  username: String
  password: String

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getUserName().subscribe(data => {
      this.user = data;
      if (this.user){
        this.showName = true;     
      }
    });
  }

  logout() {
    this.showName = false;
  }

  onSubmit() {
    this.userService.checkUser("Jane").subscribe(data => {
      this.user = data;
      if (this.user){
        this.showName = true;     
      }
    })
  }

}
