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
        ans.forEach(element => {
          var div   = this.renderer.createElement('div')
                      this.renderer.setAttribute(div, 'class', 'quizElement')
          var table = this.renderer.createElement('table')
          this.renderer.addClass(table, 'table')
          var thead = this.renderer.createElement('thead')
          var trh   = this.renderer.createElement('tr')
                    this.renderer.addClass(trh, 'question')
          var th    = this.renderer.createElement('th')
          var btn   = this.renderer.createElement('button')
                      this.renderer.setProperty(btn, 'type','button')
                      this.renderer.setAttribute(btn, 'class', 'btn btn-success')
          var btnTxt= this.renderer.createText('Check')

          this.renderer.appendChild(btn, btnTxt)
          this.answer = element
          this.cAns[this.answer.question.questionId] = JSON.parse(this.answer.option)

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
                 this.renderer.setProperty(tr, 'id', temp[i])
                 this.renderer.setAttribute(tr, 'name', this.answer.question.questionId.toString()+'tr')
            td = this.renderer.createElement('td')
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

          this.renderer.appendChild(div, table)
          this.renderer.appendChild(div, btn)
          //this.renderer.appendChild(this.quiz.nativeElement, table)
          this.renderer.appendChild(this.quiz.nativeElement, div)
        });
      })

  }

  onCheck(id: number){
    //remove any classes previously added to radio button group
    var trow = document.getElementsByName(id.toString()+'tr')
    trow.forEach(data => {
      if (data.className == "table-success"){this.renderer.removeClass(data, "table-succes")}
      else if (data.className == "table-danger"){this.renderer.removeClass(data, "table-danger")}
    })
    //correct answer
    if(this.rBtnIn[id] == this.cAns[id]){
      console.log("Correct")
      var trow = document.getElementsByName(id.toString()+'tr')
      trow.forEach(data => {
        if (data.id == this.rBtnIn[id]) {this.renderer.addClass(data, "table-success")}
      })
      //var cRow = document.getElementById(this.rBtnIn[id])
      //this.renderer.addClass(cRow, "table-success")
    }
    //incorrect answer
    else { 
      var trow = document.getElementsByName(id.toString()+'tr')
      trow.forEach(data => {
        if (data.id == this.rBtnIn[id]) {this.renderer.addClass(data, "table-danger")}
        else if (data.id == this.cAns[id]) {this.renderer.addClass(data, "table-success")}
      })

      console.log("Incorrect")
      //var icRow = document.getElementById(this.rBtnIn[id])
      console.log("Selected: "+this.rBtnIn[id])
      //this.renderer.addClass(icRow, "table-danger")
      //var cRow = document.getElementById(this.cAns[id])
      console.log("Expected: "+this.cAns[id])
      //this.renderer.addClass(cRow, "table-success")
    }
  }



}
