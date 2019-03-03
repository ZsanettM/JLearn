import { TestBed } from '@angular/core/testing';
import { ProgressTrackService } from './progressTrack.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
})