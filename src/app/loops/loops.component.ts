import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-loops',
  templateUrl: './loops.component.html',
  styleUrls: ['./loops.component.css']
})
export class LoopsComponent implements OnInit {

  checked: boolean =false;
  scoreEarned: number =30;
  private currentTime: Date;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checked = Boolean(localStorage.getItem('loopsRead'));
  }

  onChecked(){

    this.currentTime = new Date()      
    console.log(this.currentTime)

    //TODO: call progressService function saveChecked(userId, tutorialId, date, time)
    //TODO: get verall user score (sum(score.points) where userID=userId)
    //TODO: store score in locaStorage -> if empty onInit() => call function to retrieve it

    this.checked = !this.checked;
    localStorage.setItem('loopsRead', this.checked.toString());
    if (this.checked){this.userService.updateScore(this.scoreEarned);}
    else {this.userService.updateScore(-this.scoreEarned);}

    
  }

}
