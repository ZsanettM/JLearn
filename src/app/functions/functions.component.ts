import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  checked: boolean =false;
  scoreEarned: number =30;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checked = Boolean(localStorage.getItem('functionsRead'));
  }

  onChecked(){
    this.checked = !this.checked;
    localStorage.setItem('functionsRead', this.checked.toString());
    if (this.checked){this.userService.updateScore(this.scoreEarned);}
    else {this.userService.updateScore(-this.scoreEarned);}
    
  }

}
