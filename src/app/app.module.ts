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
import { VariablesComponent } from './variables/variables.component';
import { SimpleAppsComponent } from './simple-apps/simple-apps.component';
import { FunctionsComponent } from './functions/functions.component';
import { FooterComponent } from './footer/footer.component';
import { TuplesComponent } from './tuples/tuples.component';
import { ForLoopComponent } from './for-loop/for-loop.component';
import { ClassesComponent } from './classes/classes.component';
import { ModulesComponent } from './modules/modules.component';
import { FilesComponent } from './files/files.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TutorialComponent,
    HomeComponent,
    LoopsComponent,
    VariablesComponent,
    SimpleAppsComponent,
    FunctionsComponent,
    FooterComponent,
    TuplesComponent,
    ForLoopComponent,
    ClassesComponent,
    ModulesComponent,
    FilesComponent,
    ExceptionsComponent,
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
