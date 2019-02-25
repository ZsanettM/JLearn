import { Component, OnInit } from '@angular/core';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor(private ptService: ProgressTrackService) { }

  ngOnInit() {
  }

}
