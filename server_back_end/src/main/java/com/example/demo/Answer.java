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
public class Answer {

    @Id @GeneratedValue
    private int answerId;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="questionID", referencedColumnName="questionID")
    private Question question;

    private String option;


}