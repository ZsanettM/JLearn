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
export class ProgressComponent implements OnInit {
  private scoreObjs: Score[] = []
  private items: any[]
  private counter: number =0

  constructor(private service: ProgressTrackService) { }

    public ngOnInit(): void {

      this.getProgressData(1);

    }

    getProgressData(userId: number){

      this.service.getUserProgress(userId).subscribe(obj => {
        obj.forEach(element => {
          this.scoreObjs.push(element)
          console.log("One obj:",element)
        });
        console.log("Obj array",this.scoreObjs)})
      
        this.scoreObjs.forEach(score => {
          this.items.push({x: score.date, y: score.tutorial.points})
          console.log(score)
        })
      this.scoreObjs.forEach(function (value){
        console.log(value.date)
        this.items.push({x: value.date, y:value.tutorial.points, label: {content: value.tutorial.title}})
      })
      console.log(this.items)
      this.drawGraph()


    }

    drawGraph(){
            var container = document.getElementById('mynetwork');    

      var dataset = new DataSet(this.items);
      var options = {
        start: "2019-02-11",
        end: "2019-02-12",
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
