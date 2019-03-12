import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import  {ExercisesComponent} from './exercises.component';

@Injectable()
export class AlertGuard implements CanDeactivate<ExercisesComponent> {
    constructor(public router: Router) {}

    canDeactivate(component: ExercisesComponent):boolean{
        return component.leave ? true : false;
    }
}