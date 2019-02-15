import { Component, OnInit } from '@angular/core';
import { Network, Node, Edge, DataSet, IdType, Graph2d } from 'vis';
import 'vis/dist/vis-timeline-graph2d.min.css';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { Score } from '../shared/progress/score';

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

  constructor(private service: ProgressTrackService) { }

    public ngOnInit(): void {

      this.getProgressData(1);

    }

    getProgressData(userId: number){

      this.service.getUserProgress(userId).subscribe(obj => {
        this.scoreObjs = obj
        obj.forEach(element => {

          this.items.push({x: (element.date+" "+element.time), y:element.tutorial.points, label: {content: element.tutorial.title}})
        });
        this.drawGraph()
      })

      console.log("Items: ", this.items.length)
      this.drawGraph()


    }

    drawGraph(){
      var container = document.getElementById('mynetwork');    

      var dataset = new DataSet(this.items);
      var options = {
        start: this.scoreObjs[0].date+" "+this.scoreObjs[0].time,
        end: this.scoreObjs[this.scoreObjs.length-1].date+" "+this.scoreObjs[this.scoreObjs.length-1].time,
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

}
