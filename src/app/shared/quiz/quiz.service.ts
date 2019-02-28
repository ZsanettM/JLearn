import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({ providedIn: 'root'})
export class QuizService {

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }

    getQuestion(qid: number): Observable<any> {
        return this.http.post<Question>('//localhost:8080/getQuestion', qid, this.httpOptions);
    }
}
