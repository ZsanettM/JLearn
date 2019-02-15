package com.example.demo;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.web.bind.annotation.Mapping;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import java.sql.Date;
import java.sql.Time;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
public class Score {
    @Id @GeneratedValue
    private Long sid;
    private @NonNull Long uid; //user id
    //private @NonNull Long tid; //tutorial id
    @Basic
    private Date date;
    @Basic
    private Time time;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="tid", referencedColumnName="tid")
    private Tutorial tutorial;

    //getters
    public Long getUId(){
        return uid;
    }
    public Long getTId(){
        return tutorial.getId();
    }
    public Date getDate(){
        return date;
    }

    //setters
    public void setUId(Long uID){
        this.uid = uID;
    }
    public void setTId(Long tID){
        this.tutorial.setId(tID);
    }
    private void setDate(Date d){
        this.date = d;
    }
}