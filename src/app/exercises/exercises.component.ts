import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz/quiz.service';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor(private qService: QuizService) { }

  ngOnInit() {
    this.qService.getQuestion(1).subscribe(question => {
      if (question){
        console.log(question.question);
        var temp = JSON.parse(question.options)
        for (var i in temp){
          console.log(temp[i])
        }
      }
    })
  }

}
