import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForLoopComponent } from './for-loop.component';
import { MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForLoopComponent', () => {
  let component: ForLoopComponent;
  let fixture: ComponentFixture<ForLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForLoopComponent ],
      imports: [MatExpansionModule, FormsModule, HttpClientModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
