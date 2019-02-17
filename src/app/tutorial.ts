import { Component, OnInit, Directive } from '@angular/core';
import { UserService } from './shared/user/user.service';
import { ProgressTrackService } from './shared/progress/progressTrack.service';

@Component({
    template:''
})

export class Tutorial implements OnInit {
  private checked: boolean =false;
  public checkTitle: string;
  private currentTime: Date;
  public tutorialID: number;

  constructor(private ptService: ProgressTrackService/*tid: number, title: string*/){
      //this.tutorialID = tid;
      //this.checkTitle = title;
    }

    ngOnInit(){
        this.checked = (localStorage.getItem(this.checkTitle)=='true' ? true : false)
    }

    onChecked(){
        
        this.currentTime = new Date()   
        this.checked = !this.checked;

        localStorage.setItem(this.checkTitle, this.checked.toString());

        if (this.checked){
          //add --> saveChecked()
          this.ptService.saveChecked(Number(localStorage.getItem("uid")), this.tutorialID, this.currentTime)
            .subscribe(data => console.log(data));
          //this.userService.updateScore(this.scoreEarned);
          //get new score
          this.ptService.getUserScore(Number(localStorage.getItem("uid")))
          .subscribe(score => {
            localStorage.setItem("userScore", score.toString());
          }) 
        }
        else {
          //remove -->deleteUnChecked()
          this.ptService.deleteUnChecked(this.tutorialID, Number(localStorage.getItem("uid")))
            .subscribe()
          //this.userService.updateScore(-this.scoreEarned);
          //get new score
          this.ptService.getUserScore(Number(localStorage.getItem("uid")))
          .subscribe(score => {
            localStorage.setItem("userScore", score.toString());
          }) 
        }
      }
}