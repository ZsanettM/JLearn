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
public class QuizResult{
    @Id @GeneratedValue
    private @NonNull int rid;
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="uid", referencedColumnName="uid")
    private @NonNull User user;
    @Transient
    public Long uid;
    private @NonNull double result;

    //getters
    public User getUser(){
        return user;
    }
    public double getResult(){
        return result;
    }

    //setters
    public void setUser(User u){
        this.user = u;
    }
    public void setResult(double r){
        this.result = r;
    }
}