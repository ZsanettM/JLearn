import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent extends Tutorial {

  checkTitle = 'functionsRead'
  tutorialID = 4
  //tutorialLevel: number = 2
  //tutorialTitle: string = "Functions"
  //tutorialPoints: number = 40

}
