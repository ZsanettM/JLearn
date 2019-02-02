import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  checked: boolean =false;
  scoreEarned: number =30;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onChecked(){
    this.checked = !this.checked;
    if (this.checked){this.userService.updateScore(this.scoreEarned);}
    else {this.userService.updateScore(-this.scoreEarned);}
    
  }

}
