import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { QuizService } from '../shared/quiz/quiz.service';
import { Answer } from '../shared/quiz/answer';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('quiz') quiz: ElementRef;
  private answer: Answer;
  private cAns: string[] = []

  constructor(private qService: QuizService, private renderer: Renderer2) { }

  ngOnInit() {
    var table = this.renderer.createElement('table')
                this.renderer.addClass(table, 'table')
    var thead = this.renderer.createElement('thead')
    var trh   = this.renderer.createElement('tr')
                this.renderer.addClass(trh, 'warning')
    var th    = this.renderer.createElement('th')
    
/*
    this.qService.getAnswers().subscribe(question => {
      if (question){
        console.log(question.ans)

        var qText = this.renderer.createText(question.question)

        //append question
        this.renderer.appendChild(th, qText)
        this.renderer.appendChild(trh, th)
        this.renderer.appendChild(thead, trh)
        this.renderer.appendChild(table, thead)

        var tbody = this.renderer.createElement('tbody')
        var tr = this.renderer.createElement('tr')
        var td = this.renderer.createElement('td')
        var rb = this.renderer.createElement('input')
        this.quiz.nativeElement

        console.log(question.question);

        var temp = JSON.parse(question.options)
        for (var i in temp){
          tr = this.renderer.createElement('tr')
          td = this.renderer.createElement('td')
          rb = this.renderer.createElement('input')
                 this.renderer.setProperty(rb, 'type', 'radio')
                 this.renderer.setProperty(rb, 'name', question.questionId)
          var qOpt = this.renderer.createText(temp[i])

          console.log(temp[i])

          //append options
          this.renderer.appendChild(td, rb)
          this.renderer.appendChild(td, qOpt)
          this.renderer.appendChild(tr, td)
          this.renderer.appendChild(tbody, tr)
        }

        this.renderer.appendChild(table, tbody)
      }
    })*/

 

    this.qService.getAnswers().subscribe(ans => {
        ans.forEach(element => {
          this.answer = element
          this.cAns.push(JSON.parse(this.answer.option))
          //console.log(this.cAns[this.answer.question.questionId-1])

          var qText = this.renderer.createText(this.answer.question.question)
          //append question
          this.renderer.appendChild(th, qText)
          this.renderer.appendChild(trh, th)
          this.renderer.appendChild(thead, trh)
          this.renderer.appendChild(table, thead)

          //create table body elements
          var tbody = this.renderer.createElement('tbody')
          var tr = this.renderer.createElement('tr')
          var td = this.renderer.createElement('td')
          var rb = this.renderer.createElement('input')
          this.quiz.nativeElement

          var temp = JSON.parse(this.answer.question.options)
          for (var i in temp){
            tr = this.renderer.createElement('tr')
            td = this.renderer.createElement('td')
            rb = this.renderer.createElement('input')
                   this.renderer.setProperty(rb, 'type', 'radio')
                   this.renderer.setProperty(rb, 'name', this.answer.question.questionId)
            var qOpt = this.renderer.createText(temp[i])
  
            console.log(temp[i])
  
            //append options
            this.renderer.appendChild(td, rb)
            this.renderer.appendChild(td, qOpt)
            this.renderer.appendChild(tr, td)
            this.renderer.appendChild(tbody, tr)
          }
  
          this.renderer.appendChild(table, tbody)
        });
      })
      this.renderer.appendChild(this.quiz.nativeElement, table)
  }


}
