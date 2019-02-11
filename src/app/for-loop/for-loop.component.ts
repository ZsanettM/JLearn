import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-for-loop',
  templateUrl: './for-loop.component.html',
  styleUrls: ['./for-loop.component.css']
})
export class ForLoopComponent implements OnInit {
  
  checked: boolean =false;
  scoreEarned: number =30;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checked = Boolean(localStorage.getItem('forloopsRead'));
  }

  onChecked(){
    this.checked = !this.checked;
    localStorage.setItem('forloopsRead', this.checked.toString());
    if (this.checked){this.userService.updateScore(this.scoreEarned);}
    else {this.userService.updateScore(-this.scoreEarned);}
    
  }

}
