import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { QuizService } from '../shared/quiz/quiz.service';
import { Answer } from '../shared/quiz/answer';
import { IHash } from '../shared/quiz/IHash';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('quiz') quiz: ElementRef;
  private answer: Answer;
  private cAns: IHash = {}
  private rBtnIn: IHash = {}

  constructor(private qService: QuizService, private renderer: Renderer2) { }

  ngOnInit() { 

    this.qService.getAnswers().subscribe(ans => {
      console.log(ans)
        ans.forEach(element => {
          var table = this.renderer.createElement('table')
          this.renderer.addClass(table, 'table')
          var thead = this.renderer.createElement('thead')
          var trh   = this.renderer.createElement('tr')
                    this.renderer.addClass(trh, 'warning')
          var th    = this.renderer.createElement('th')
          var btn   = this.renderer.createElement('button')
                    this.renderer.setProperty(btn, 'type','button')
          var btnTxt= this.renderer.createText('Check')

          this.renderer.appendChild(btn, btnTxt)
          this.answer = element
          this.cAns[this.answer.question.questionId] = JSON.parse(this.answer.option)
          //this.cAns.push(JSON.parse(this.answer.option))
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
                 this.renderer.setProperty(td, 'id', temp[i])
            rb = this.renderer.createElement('input')
                   this.renderer.setProperty(rb, 'type', 'radio')
                   this.renderer.setAttribute(rb, 'name', this.answer.question.questionId.toString())
                   this.renderer.setAttribute(rb, 'value', temp[i])
                   this.renderer.listen(rb, 'click', (event) => {
                     this.rBtnIn[rb.name] = event.explicitOriginalTarget.value
                  })
            var qOpt = this.renderer.createText(temp[i])
  
  
            //append options
            this.renderer.appendChild(td, rb)
            this.renderer.appendChild(td, qOpt)
            this.renderer.appendChild(tr, td)
            this.renderer.appendChild(tbody, tr)
          }

  
          this.renderer.appendChild(table, tbody)

          this.renderer.setProperty(btn, 'value', this.answer.question.questionId)
          this.renderer.listen(btn, 'click', (event) => { this.onCheck(btn.value)})
          this.renderer.appendChild(this.quiz.nativeElement, table)
          this.renderer.appendChild(this.quiz.nativeElement, btn)
        });
      })

  }

  onCheck(id: number){
    if(this.rBtnIn[id] == this.cAns[id]){
      console.log("Correct")
      var row = document.getElementById(this.rBtnIn[id])
      this.renderer.addClass(row, "success")
    }
    else { 
    console.log("Incorrect")
    console.log("radio:" +this.rBtnIn[id])
    console.log("answer:" +this.cAns[id])
  }
  }


}
