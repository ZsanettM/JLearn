import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoopsComponent } from './loops/loops.component';
import { SimpleAppsComponent } from './simple-apps/simple-apps.component';
import { FunctionsComponent } from './functions/functions.component';
import { VariablesComponent } from './variables/variables.component';
import { TuplesComponent } from './tuples/tuples.component';
import { ForLoopComponent } from './for-loop/for-loop.component'
import { ProgressComponent } from './progress/progress.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loops', component: LoopsComponent, canActivate: [AuthGuardService] },
  { path: 'simpleApps', component: SimpleAppsComponent, canActivate: [AuthGuardService]},
  { path: 'functions', component: FunctionsComponent, canActivate: [AuthGuardService]},
  { path: 'variables', component: VariablesComponent, canActivate: [AuthGuardService]},
  { path: 'tuples', component: TuplesComponent, canActivate: [AuthGuardService]},
  { path: 'forLoops', component: ForLoopComponent, canActivate: [AuthGuardService]},
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuardService]},
  { path: 'progress', component: ProgressComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true } //debug
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
