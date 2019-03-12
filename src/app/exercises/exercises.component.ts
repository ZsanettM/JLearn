import { Component, OnInit, ViewChild, ElementRef, Renderer2, ChangeDetectorRef} from '@angular/core';
import { Router, NavigationStart, NavigationCancel } from '@angular/router';
import { QuizService } from '../shared/quiz/quiz.service';
import { Answer } from '../shared/quiz/answer';
import { IHash } from '../shared/quiz/IHash';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('chart') chart: ElementRef;
  @ViewChild('quiz') quiz: ElementRef;
  private answer: Answer;
  private cAns: IHash = {}
  private rBtnIn: IHash = {}
  private chartData: [number, number, number] = [0,0,0] //correct, incorrect, na
  private context: CanvasRenderingContext2D;
  private quizState: any
  public finished: boolean = false
  public leave: boolean

  constructor(private qService: QuizService, private renderer: Renderer2, private cd: ChangeDetectorRef, public router:Router) { }


  ngOnInit() { 
    //Alert user before leaving quiz
    this.router.events.subscribe(event =>
      {
      if(event instanceof NavigationStart && this.router.url =="/exercises"){
        if(this.leave==null){ //pop-up has not been shown yet
          if(this.finished || (this.chartData[2]==25)){ 
          console.log("canDeactivate"); 
          this.leave=true;
          }
        
       else{
         this.leave =window.confirm('Do you really want to leave? Your scores will only be saved once you answer all questions.')
         console.log("leave: ",this.leave)
        }
      }else{this.leave=true;}}
      
    })

    //If quiz has been done before => display message
    if(!localStorage.getItem('quiz')){}

    this.qService.getAnswers().subscribe(ans => {
        ans.forEach(element => {
          this.chartData[2] += 1
          
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
          //console.log(this.answer.option);
          
          this.cAns[this.answer.question.questionId] = this.answer.option

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

          //console.log(this.answer.question.options)
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
          this.renderer.appendChild(this.quiz.nativeElement, div)
        });

      console.log(this.chartData)
      this.drawChart()
      })

  }


  onCheck(id: number){

    var repeatAttemptC = false; //repeated check  - correct originally
    var repeatAttemptW = false; //repeated check  - incorrect originally
    //remove any classes previously added to radio button group
    var trow = document.getElementsByName(id.toString()+'tr')
    trow.forEach(data => {
      if (data.className == "table-success"){
        this.renderer.removeClass(data, "table-succes")
        repeatAttemptC = true
      }
      else if (data.className == "table-danger"){
        this.renderer.removeClass(data, "table-danger")
        repeatAttemptW = true
        if(repeatAttemptW && this.chartData[1]!=0) {this.chartData[1] -= 1}
      }
    })
    if (repeatAttemptC && !repeatAttemptW){
      if(repeatAttemptC && this.chartData[0]!=0) {this.chartData[0] -= 1}
    }

    //correct answer
    if(this.rBtnIn[id] == this.cAns[id]){
      this.chartData[0] += 1
      console.log("Correct")
      var trow = document.getElementsByName(id.toString()+'tr')
      trow.forEach(data => {
        if (data.id == this.rBtnIn[id]) {this.renderer.addClass(data, "table-success")}
      })
    }

    //incorrect answer
    else { 
      this.chartData[1] += 1
      var trow = document.getElementsByName(id.toString()+'tr')
      trow.forEach(data => {
        if (data.id == this.rBtnIn[id]) {this.renderer.addClass(data, "table-danger")}
        else if (data.id == this.cAns[id]) {this.renderer.addClass(data, "table-success")}
      })

      console.log("Incorrect")
      console.log("Selected: "+this.rBtnIn[id])
      console.log("Expected: "+this.cAns[id])
    }

    if(!repeatAttemptC && !repeatAttemptW)  {this.chartData[2] -= 1}
    console.log(this.chartData)

    if(this.chartData[2] == 0) {
      //calc result:
      let calculatedRes = this.chartData[0]*100/(this.chartData[0]+this.chartData[1])

      console.log("Finished quiz, result: ",calculatedRes)
      alert("Quiz finished! +100pts")
      this.finished = true;
      if(!localStorage.getItem('quiz')){
        this.qService.saveQuiz(Number(localStorage.getItem("uid")))
        .subscribe(data =>  {
          //get new score
          this.qService.getUserScore(Number(localStorage.getItem("uid")))
          .subscribe(score => {
            localStorage.setItem("userScore", score.toString());
          }) 
        });
        this.qService.saveQuizResult(Number(localStorage.getItem("uid")), calculatedRes).subscribe()
      }else{
        this.qService.updateQuizResult(Number(localStorage.getItem("uid")), calculatedRes).subscribe()
      }
    }

    this.quizState.destroy()
    this.drawChart()
  }

  drawChart(){
    this.cd.detectChanges();

    this.context = (<HTMLCanvasElement>this.chart.nativeElement).getContext('2d');
    this.quizState = new Chart(this.context, {
      type: 'doughnut',
      data:{
        labels: ['correct', 'wrong', 'unanswered'],
        datasets: [{
          data: this.chartData,
          backgroundColor:  ['#3cba9f', '#ff6666', '#ffcc00']
        }]
      },
      options: {
        animation: {
          animateRotate: true,
          animateScale: false
        }
      }
    })

  }



}
