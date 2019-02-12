import { Component, OnInit } from '@angular/core';
import { Network, Node, Edge, DataSet, IdType, Graph2d } from 'vis';
import 'vis/dist/vis-timeline-graph2d.min.css';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor() { }

  public nodes: Node;
    public edges: Edge;
    public network : Network;

    public ngOnInit(): void {

      var container = document.getElementById('mynetwork');       

      var items = [
        {x: '2014-06-11', y: 10},
        {x: '2014-06-12', y: 25},
        {x: '2014-06-13', y: 30},
        {x: '2014-06-14', y: 10},
        {x: '2014-06-15', y: 15},
        {x: '2014-06-16', y: 30}
      ];
          
          var dataset = new DataSet(items);
          var options = {
            start: '2014-06-05',
            end: '2014-06-18',
            moveable: false
          };
          var graph2d = new Graph2d(container, dataset, options);
    }

}
