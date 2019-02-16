package com.example.demo;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.web.bind.annotation.Mapping;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@Table(uniqueConstraints={
    @UniqueConstraint(columnNames={"uid","tid"})
})
public class Score {
    @Id @GeneratedValue
    private Long sid;
    private @NonNull Long uid; //user id
    //private @NonNull Long tid; //tutorial id
   /* @Basic
    private Date date;
    @Basic
    private Time time;*/
    @Basic
    private Timestamp timestmp;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="tid", referencedColumnName="tid")
    private Tutorial tutorial;

    @Transient
    public Long tid;

    //getters
    public Long getUId(){
        return uid;
    }
    public Long getTId(){
        return tutorial.getId();
    }
    public Timestamp getDate(){
        return timestmp;
    }

    //setters
    public void setUId(Long uID){
        this.uid = uID;
    }
    public void setT(Long tID){
        this.tutorial.setId(tID);
    }
    public void setDate(Timestamp d){
        this.timestmp = d;
    }
    public void setTutorial(Tutorial t){
        this.tutorial = t;
    }
}