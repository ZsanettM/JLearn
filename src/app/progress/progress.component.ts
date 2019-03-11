import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  DataSet,Graph2d } from 'vis';
import { Chart } from 'chart.js';
import 'vis/dist/vis-timeline-graph2d.min.css';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Score } from '../shared/progress/score';
import { QuizService } from '../shared/quiz/quiz.service';
import { QuizRes } from '../shared/quizRes';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent implements OnInit{
  private scoreObjs: Score[] = []
  private items: any[] =[]
  private currentTime: Date
  private tempTimeForEnd: Date
  private counter: number = 0
  public qResult: QuizRes = new QuizRes

  public uName: string; public uScore: number; public uId: number; public uImg: string; public uEmail: string;
  public defaultScreen: boolean = true;

  @ViewChild('lbCanvas') canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  private lbScores: any[]= []
  private lbNames: any[] = []

  constructor(private service: ProgressTrackService, private qService: QuizService, private cd: ChangeDetectorRef) {
   }

    public ngOnInit(): void {
      //get values from localStorage
      this.uName = localStorage.getItem("userName")
      this.uScore = Number(localStorage.getItem("userScore"))
      this.uId = Number(localStorage.getItem("uid"))
      this.uImg = localStorage.getItem("image")
      this.uEmail = localStorage.getItem("email")

      this.qService.getQuizResult(this.uId).subscribe(result => {
        if(result){
          this.qResult = result
          localStorage.setItem('quiz', this.qResult.result.toString())
        }
        else {
          this.qResult.result = 0
        }
      })

      //get scores from DB
      this.getProgressData();

    }

    getProgressData(){

      this.service.getUserProgress(this.uId).subscribe(obj => {
        this.scoreObjs = obj
        obj.forEach(element => {
          this.counter += element.tutorial.points

          this.items.push({x: (element.timestmp), y:this.counter, label: {content: element.tutorial.title}})
          //console.log("Items #: ", this.items[this.counter])
          //this.counter++
        });
        this.drawGraph()
      })

      this.service.getTopScores().subscribe(result =>{
        result.forEach(element => {
          this.lbScores.push(element[0]);
          this.lbNames.push(element[1]);
        });

      })
    }

    //---------Your Progress (vis.js)----------------//
    drawGraph(){
      this.defaultScreen = true;
      this.cd.detectChanges();

      console.log(this.defaultScreen)
      var container = document.getElementById('mynetwork');   
      
      this.tempTimeForEnd = new Date(this.scoreObjs[this.scoreObjs.length-1].timestmp)
      this.tempTimeForEnd.setDate( this.tempTimeForEnd.getDate() + 1)
      console.log(this.tempTimeForEnd)

      var dataset = new DataSet(this.items);
      var options = {
        start: this.scoreObjs[0].timestmp,
        end: this.tempTimeForEnd,
        moveable: false,
        drawPoints: {
          style: 'square'
        },
        shaded: {
          orientation: 'bottom'
        }
      };
      var graph2d = new Graph2d(container, dataset, options);
    }

     //---------Leaderboard (chart.js)----------------//
    drawCanvas(){
      this.defaultScreen = false;
      this.cd.detectChanges();

      this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
      var leaderBoard = new Chart(this.context, {
        type: 'bar',
        data: {
          labels: this.lbNames,
          datasets: [{
            label: 'Top Scores',
            data: this.lbScores,
            borderColor: ['#3cba9f', '#ffcc00', '#4cba9f'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }


}
