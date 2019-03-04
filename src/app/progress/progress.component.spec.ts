import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComponent } from './progress.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let service: ProgressTrackService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComponent ],
      imports: [HttpClientModule ]
    })
    .compileComponents();
        //mock localStorage 
        let storage = {};
        const mLocalStorage = {
    
          getItem: (key: string): string => {
            return key in storage ? storage[key] : null;
          },
          setItem: (key: string, value: string) => {
            storage[key] = value;
          },
          removeItem: (key: string) => {
            delete storage[key];
          },
          clear: () => {
            storage = {}
          },
          length: () => {
            let temp = 0;
            for (let i in storage){
              temp++
            }
            return temp
          }
        }
        //use spyOn to replace calls to localStorage with calls to mLocalStorage (mock)
        spyOn(localStorage, 'getItem').and.callFake(mLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mLocalStorage.setItem);
        spyOn(localStorage, 'clear').and.callFake(mLocalStorage.clear);
        spyOnProperty(localStorage, 'length').and.callFake(mLocalStorage.length)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should get user data from localStorage onInit', () =>{
    localStorage.setItem("userName","Tester2")
    localStorage.setItem("userScore", "125")
    localStorage.setItem("uid", "99")
    localStorage.setItem( "image", "../../assets/katie.png")

    component.ngOnInit()

    let getProgressDataSpy = spyOn(component, 'getProgressData')
    expect(getProgressDataSpy).toHaveBeenCalled();
  })
*/
  afterEach(() =>{
    fixture.destroy();
  })
});
