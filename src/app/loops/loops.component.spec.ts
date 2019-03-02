import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopsComponent } from './loops.component';
import { MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('LoopsComponent', () => {
  let component: LoopsComponent;
  let fixture: ComponentFixture<LoopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopsComponent ],
      imports: [MatExpansionModule, FormsModule, HttpClientModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
