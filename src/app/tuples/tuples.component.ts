import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../shared/progress/tutorial';

@Component({
  selector: 'app-tuples',
  templateUrl: './tuples.component.html',
  styleUrls: ['./tuples.component.css']
})
export class TuplesComponent extends Tutorial {

  checkTitle = 'tuplesRead'
  tutorialID = 5

}
