import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-simple-apps',
  templateUrl: './simple-apps.component.html',
  styleUrls: ['./simple-apps.component.css']
})
export class SimpleAppsComponent extends Tutorial {

  url ='http://localhost:8888/notebooks/SimplePrograms.ipynb'
  checkTitle = 'simpleRead'
  tutorialID = 1

}