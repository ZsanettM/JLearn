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
  public tutorialLevel: number;
  public tutorialTitle: string;
  public tutorialPoints: number;

  constructor(private ptService: ProgressTrackService){ }

    ngOnInit(){
      //if checkbox state is already stored in localStorage
      if (localStorage.getItem(this.checkTitle)){
        this.checked = (localStorage.getItem(this.checkTitle)=='true' ? true : false)
      } else {
        //else get state from DB
        if (localStorage.getItem("uid")){
          this.ptService.isRead(this.tutorialID,Number(localStorage.getItem("uid")))
            .subscribe(b => {
              this.checked = b
              b == true ? localStorage.setItem(this.checkTitle, 'true') : localStorage.setItem(this.checkTitle, 'false') 
            })
        }
        else {
          //TODO: msg(Something went wrong, pls log-out and log-in again)
        }
      }
    }

    onChecked(){
        
        this.currentTime = new Date()   
        this.checked = !this.checked;

        localStorage.setItem(this.checkTitle, this.checked.toString());

        if (this.checked){
          //add ---> saveChecked()
          this.ptService.saveChecked(Number(localStorage.getItem("uid")), this.tutorialID, this.currentTime)
             .subscribe(data =>  {
                //get new score
                this.ptService.getUserScore(Number(localStorage.getItem("uid")))
                .subscribe(score => {
                  localStorage.setItem("userScore", score.toString());
                }) 
             });
          

        }
        else {
          //remove --->deleteUnChecked()
          this.ptService.deleteUnChecked(this.tutorialID, Number(localStorage.getItem("uid")))
            .subscribe(data =>{
              //get new score
              this.ptService.getUserScore(Number(localStorage.getItem("uid")))
              .subscribe(score => {
                localStorage.setItem("userScore", score.toString());
              }) 
            })
          

        }
      }
}