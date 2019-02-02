package com.example.demo;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id @GeneratedValue
    private Long uid;
    private @NonNull String username;
    private @NonNull String password;
    private Integer score;

    //getters
    public String getUsername(){
        return username;
    }
    public String getPsw(){
        return password;
    }

    //setters
    public void setUsername(String uname){
        this.username = uname;
    }

    public void setPassword(String psw){
        this.password = psw;
    }
}