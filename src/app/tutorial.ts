import { Component, OnInit, Directive, ChangeDetectorRef } from '@angular/core';
import { UserService } from './shared/user/user.service';
import { ProgressTrackService } from './shared/progress/progressTrack.service';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "safe" })

@Component({
    template:''
})

export class Tutorial implements OnInit {
  public checked: boolean =false;
  public checkTitle: string;
  public currentTime: Date;
  public tutorialID: number;
  public tutorialLevel: number;
  public tutorialTitle: string;
  public tutorialPoints: number;

  public link: any
  public url = ""

  constructor(private ptService: ProgressTrackService, public sanitizer: DomSanitizer, private cd: ChangeDetectorRef){ }
/*
  transform(url: string, section: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + section);
  }
*/
newLink(url: string, id: string){
  this.cd.detectChanges();
  this.link = this.sanitizer.bypassSecurityTrustResourceUrl(url+ id)
}
    ngOnInit(){
      this.newLink(this.url, '')

      //this.cd.detectChanges();
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