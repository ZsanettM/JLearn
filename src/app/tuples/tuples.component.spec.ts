import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuplesComponent } from './tuples.component';
import { MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('TuplesComponent', () => {
  let component: TuplesComponent;
  let fixture: ComponentFixture<TuplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuplesComponent ],
      imports: [MatExpansionModule, FormsModule, HttpClientModule, BrowserAnimationsModule, AngularFontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuplesComponent);
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
