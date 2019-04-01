import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAppsComponent } from './simple-apps.component';
import { MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('SimpleAppsComponent', () => {
  let component: SimpleAppsComponent;
  let fixture: ComponentFixture<SimpleAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAppsComponent ],
      imports: [MatExpansionModule, FormsModule, HttpClientModule, BrowserAnimationsModule, AngularFontAwesomeModule], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() =>{
    fixture.destroy();
  })
});
