import { Component, OnInit } from '@angular/core';
import { Network, Node, Edge, DataSet, IdType, Graph2d } from 'vis';
import 'vis/dist/vis-timeline-graph2d.min.css';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Score } from '../shared/progress/score';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

/*
interface ReturnedObject {
  place: number
  body: Score
}*/

export class ProgressComponent implements OnInit {
  private scoreObjs: Score[] = []
  private items: any[] =[]
  private currentTime: Date
  private tempTimeForEnd: Date
  private counter: number = 0
  private uName: string; private uScore: number;

  constructor(private service: ProgressTrackService) { }

    public ngOnInit(): void {
      //get values from localStorage
      this.uName = localStorage.getItem("userName")
      this.uScore = Number(localStorage.getItem("userScore"))

      //get scores from DB
      this.getProgressData(1);

    }

    getProgressData(userId: number){

      this.service.getUserProgress(userId).subscribe(obj => {
        this.scoreObjs = obj
        obj.forEach(element => {
          this.counter += element.tutorial.points

          this.items.push({x: (element.timestmp), y:this.counter, label: {content: element.tutorial.title}})
          //console.log("Items #: ", this.items[this.counter])
          //this.counter++
        });
        this.drawGraph()
      })

      
      //this.drawGraph()


    }

    drawGraph(){
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
          style: 'square' // square not working
        },
        shaded: {
          orientation: 'bottom'
        }
      };
      var graph2d = new Graph2d(container, dataset, options);
    }


}
