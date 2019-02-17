import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';

@Component({
  selector: 'app-tuples',
  templateUrl: './tuples.component.html',
  styleUrls: ['./tuples.component.css']
})
export class TuplesComponent implements OnInit {

  checked: boolean =false;
  scoreEarned: number =30;
  private currentTime: Date;
  private tutorialID: number = 5;

  constructor(private userService: UserService, private ptService: ProgressTrackService) { }

  ngOnInit() {
    this.checked = (localStorage.getItem('tuplesRead')=='true' ? true : false)
  }

  onChecked(){
    console.log(this.tutorialID, "onChecked")
    /*this.checked = !this.checked;
    localStorage.setItem('tuplesRead', this.checked.toString());
    if (this.checked){this.userService.updateScore(this.scoreEarned);}
    else {this.userService.updateScore(-this.scoreEarned);}*/
    
    this.currentTime = new Date()      
    console.log(this.currentTime)
    
    this.checked = !this.checked;
    localStorage.setItem('tuplesRead', this.checked.toString());
    if (this.checked){
      //add --> saveChecked()
      this.ptService.saveChecked(Number(localStorage.getItem("uid")), this.tutorialID, this.currentTime)
        .subscribe(data => console.log(data));
      this.userService.updateScore(this.scoreEarned);
    }
    else {
      //remove -->deleteUnChecked()
      this.ptService.deleteUnChecked(this.tutorialID, Number(localStorage.getItem("uid")))
        .subscribe()
      this.userService.updateScore(-this.scoreEarned);
    }
  }


}
