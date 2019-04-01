import { TestBed } from '@angular/core/testing';
import { ProgressTrackService } from './progressTrack.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Score } from './score';
import { Tutorial } from './tutorial';

describe('ProgressTrackService', () => {
    let service: ProgressTrackService
    let http: HttpTestingController

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProgressTrackService]
        })
       http = TestBed.get(HttpTestingController)
       service = TestBed.get(ProgressTrackService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    //Checkbox ticked
    it('should save data when user marks a tutorial checked', () =>{
        service.saveChecked(1,1, new Date()).subscribe(res =>expect(res).toBeTruthy());

        const req = http.expectOne('//localhost:8080/saveProgress');
        expect(req.request.method).toBe("POST");

        req.flush(1);
    })

    //Checkbox unticked
    it('should delete data when user marks a tutorial unchecked', () =>{
        service.deleteUnChecked(1,1).subscribe(res =>expect(res).toBeTruthy());

        const req = http.expectOne('//localhost:8080/deleteProgress');
        expect(req.request.method).toBe("POST");
    })

    //Get individual progress data
    it('should get every score for a user', () =>{
        service.getUserProgress(1).subscribe(res =>expect(res).toBeTruthy());

        const req = http.expectOne('//localhost:8080/getProgress');
        expect(req.request.method).toBe("POST");

        let s1= new Score
        s1.sid = 1; s1.uid = 1; s1.timestmp=(new Date()).toString(); s1.tid=1; s1.tutorial=new Tutorial;
        req.flush(s1)
    })

    //Get overall user score
    it('should get overall user score based on uid', () =>{
        service.getUserScore(1).subscribe(res =>expect(res).toBeTruthy());

        const req = http.expectOne('//localhost:8080/scoreSum');
        expect(req.request.method).toBe("POST");
        req.flush(100);
    })

    //Get leaderboard data
    it('should get leaderboard data', () =>{
        service.getTopScores().subscribe (res =>expect(res).toBeTruthy());

        const req = http.expectOne('//localhost:8080/leaderBoard');
        expect(req.request.method).toBe("GET");
    })
})