import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ExceptionsComponent } from './exceptions/exceptions.component';
//import { JwtModule } from '@auth0/angular-jwt';

import { AuthGuardService } from './shared/auth-guard.service';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
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
import { ProgressComponent } from './progress/progress.component';
import { Tutorial } from './tutorial';
import { ExercisesComponent } from './exercises/exercises.component';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertGuard } from './exercises/alertGuard';

//The UI components are declarations
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
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
    ProgressComponent,
    ExercisesComponent,
    Tutorial
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularStickyThingsModule,
/*     JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4200']
      }
    }) */
    AngularFontAwesomeModule
  ],
  //the service glue is a provider
  providers: [AuthGuardService, AlertGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
