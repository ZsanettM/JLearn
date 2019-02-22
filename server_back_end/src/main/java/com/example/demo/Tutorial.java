package com.example.demo;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
public class Tutorial {

    @Id @GeneratedValue
    private @NonNull Long tid;
    private @NonNull String title;
    private @NonNull int level;
    private @NonNull int points;

    //getters
    public String getTitle(){
        return title;
    }
    public int getLevel(){
        return level;
    }
    public int getPoints(){
        return points;
    }
    public Long getId(){
        return tid;
    }

    //setters
    public void setTitle(String t){
        this.title = t;
    }
    public void setLevel(int l){
        this.level = l;
    }
    public void setPoints(int p){
        this.points = p;
    }
    public void setId(Long id){
        this.tid = id;
    }
}