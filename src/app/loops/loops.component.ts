import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-loops',
  templateUrl: './loops.component.html',
  styleUrls: ['./loops.component.css']
})
export class LoopsComponent extends Tutorial{

  url = 'http://localhost:8888/notebooks/PythonLoops.ipynb'
  checkTitle = 'loopsRead'
  tutorialID = 3

}
