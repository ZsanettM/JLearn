import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-for-loop',
  templateUrl: './for-loop.component.html',
  styleUrls: ['./for-loop.component.css']
})
export class ForLoopComponent extends Tutorial {
  
  url= 'http://localhost:8888/notebooks/ForLoop.ipynb'
  checkTitle = 'forloopsRead'
  tutorialID = 6
}
