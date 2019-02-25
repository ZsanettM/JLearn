import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent extends Tutorial{

  url = 'http://localhost:8888/notebooks/Variables.ipynb'
  checkTitle = 'variablesRead'
  tutorialID = 2
  
}
