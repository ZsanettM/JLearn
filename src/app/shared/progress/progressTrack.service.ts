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

    getUserProgress(userId: number): Observable<Score[]> {
        return this.http.post<Score[]>('//localhost:8080/getProgress', userId, this.httpOptions);
    }
}