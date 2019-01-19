import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoopsComponent } from './loops/loops.component';
import { SimpleAppsComponent } from './simple-apps/simple-apps.component';
import { FunctionsComponent } from './functions/functions.component';
import { VariablesComponent } from './variables/variables.component';
import { TuplesComponent } from './tuples/tuples.component';
import { ForLoopComponent} from './for-loop/for-loop.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loops', component: LoopsComponent },
  { path: 'simpleApps', component: SimpleAppsComponent},
  { path: 'functions', component: FunctionsComponent},
  { path: 'variables', component: VariablesComponent},
  { path: 'tuples', component: TuplesComponent},
  { path: 'forLoops', component: ForLoopComponent},
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
