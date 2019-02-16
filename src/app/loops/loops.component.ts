import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { pathToFileURL } from 'url';
import { Tutorial } from '../shared/progress/tutorial';

@Component({
  selector: 'app-loops',
  templateUrl: './loops.component.html',
  styleUrls: ['./loops.component.css']
})
export class LoopsComponent implements OnInit {

  checked: boolean =false;
  scoreEarned: number =30;
  private currentTime: Date;
  private tutorial: Tutorial

  constructor(private userService: UserService, private ptService: ProgressTrackService) { }

  ngOnInit() {
    this.checked = Boolean(localStorage.getItem('loopsRead'));
    console.log(this.tutorial);
  }

  onChecked(){

    this.currentTime = new Date()      
    console.log(this.currentTime)

    //TODO: store userID in locaStorage -> if empty onInit() => call function to retrieve it
    //TODO: call progressService function saveChecked(userId, tutorialId, date, time)
    //TODO: get overall user score (sum(score.points) where userID=userId)
    //TODO: store score in locaStorage -> if empty onInit() => call function to retrieve it

    this.checked = !this.checked;
    localStorage.setItem('loopsRead', this.checked.toString());
    if (this.checked){
      //add --> saveChecked()
      this.ptService.saveChecked(Number(localStorage.getItem("uid")), 3, this.currentTime)
        .subscribe(data => console.log(data));
      this.userService.updateScore(this.scoreEarned);
    }
    else {
      //remove -->deleteUnChecked()
      this.ptService.deleteUnChecked(3, Number(localStorage.getItem("uid")))
        .subscribe()
      this.userService.updateScore(-this.scoreEarned);
    }

    
  }

}
