package com.example.demo;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
public class Question {

    @Id
    private @NonNull int questionID;
    private @NonNull String question;
    private String options;
    //@Transient
    //private int optionID;

    //getters
    public int getQuestionId(){
        return questionID;
    }
    public String getQuestion(){
        return question;
    }
    public String getOptions(){
        return options;
    }
    
    //setters
    public void setQuestionId(int id){
        this.questionID = id;
    }
    public void setQuestion(String q){
        this.question = q;
    }
}