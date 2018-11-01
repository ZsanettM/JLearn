import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { HomeComponent } from './home/home.component';
import { LoopsComponent } from './loops/loops.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TutorialComponent,
    HomeComponent,
    LoopsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
