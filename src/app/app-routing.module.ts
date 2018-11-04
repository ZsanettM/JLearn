import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { HomeComponent } from './home/home.component';
import { LoopsComponent } from './loops/loops.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tutorials', component: TutorialComponent },
  { path: 'loops', component: LoopsComponent },
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
