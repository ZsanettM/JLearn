import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../user/user';
import { Score } from './score';

@Injectable({ providedIn: 'root' })
export class ProgressTrackService {
    private user: User
    private score: Score

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }

    getUserProgress(userId: number): Observable<any> {
        return this.http.post<any>('//localhost:8080/getProgress', userId, this.httpOptions);
    }
    
    //save data when user marks a tutorial checked
    saveChecked(uid: number, tid: number, date: Date){
        //should return overall score
      return this.http.post<any>('//localhost:8080/saveProgress', JSON.stringify({uid: uid, tid: tid, date: date}), this.httpOptions);
    }

    //delete data when user marks a tutorial unchecked
    deleteUnChecked(tid: number, uid: number){
        return this.http.post('//localhost:8080/deleteProgress', JSON.stringify({tid: tid, uid: uid}), this.httpOptions);
    }

    //get overall user score based on uid
    getUserScore(userId: number): Observable<any> {
        return this.http.post<any>('//localhost:8080/scoreSum', userId, this.httpOptions);
    }

    //get checkBox state
    isRead(tid: number, uid: number){
        return this.http.post<boolean>('//localhost:8080/tutorialChecked', JSON.stringify({tid: tid, uid: uid}), this.httpOptions);
    }

    //save tutorial
    saveTutorial(tTitle: string, tLevel: number, tPoints: number){
        return this.http.post<number>('//localhost:8080/saveTutorial', JSON.stringify({title: tTitle, level: tLevel, points: tPoints}), this.httpOptions);
    }

    //check if tutorial exists
    getTutorialBool(tTitle: string){
       return this.http.post<boolean>('//localhost:8080/getTutorial', JSON.stringify({title: tTitle}), this.httpOptions);
    }

    //get leaderboard data
    getTopScores(){
        return this.http.get<any[]>('//localhost:8080/leaderBoard', this.httpOptions);
    }


}