import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';
import { QuizRes } from '../quizRes';

@Injectable({ providedIn: 'root'})
export class QuizService {
    private currentTime: Date;

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }

    getQuestion(qid: number): Observable<any> {
        return this.http.post<Question>('//localhost:8080/getQuestion', qid, this.httpOptions);
    }

    getAnswers(): Observable<any>{
        return this.http.post<Array<Answer>>('//localhost:8080/getAnswers', this.httpOptions);
    }

    //save data when user finishes quiz
    saveQuiz(uid: number){
        this.currentTime = new Date()
        //should return overall score
      return this.http.post<any>('//localhost:8080/saveProgress', JSON.stringify({uid: uid, tid: 1000, date: this.currentTime}), this.httpOptions);
    }

    //save quiz result (uid, result)
    saveQuizResult(uid: number, result: number){
        return this.http.post('//localhost:8080/saveQuizResult', JSON.stringify({uid: uid, result: result}), this.httpOptions);
    }

    //save quiz result (uid, result)
    updateQuizResult(uid: number, result: number){
        return this.http.post('//localhost:8080/updateQuizResult', JSON.stringify({uid: uid, result: result}), this.httpOptions);
    }

    //get overall user score based on uid
    getUserScore(userId: number): Observable<any> {
        return this.http.post<any>('//localhost:8080/scoreSum', userId, this.httpOptions);
    }

    //get quiz result (percentage)
    getQuizResult(uid: number): Observable<QuizRes>{
        return this.http.post<QuizRes>('//localhost:8080/getQuizResult', uid, this.httpOptions)
    }
}
