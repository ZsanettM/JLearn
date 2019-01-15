import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAppsComponent } from './simple-apps.component';

describe('SimpleAppsComponent', () => {
  let component: SimpleAppsComponent;
  let fixture: ComponentFixture<SimpleAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAppsComponent ]
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
});
