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
    private @NonNull String email;
    private String avatar;

    //getters
    public String getUsername(){
        return username;
    }
    public String getPsw(){
        return password;
    }

    public String getEmail(){
        return email;
    }
    public String getAvatar(){
        return avatar;
    }

    //setters
    public void setUsername(String uname){
        this.username = uname;
    }

    public void setPassword(String psw){
        this.password = psw;
    }

    public void setEmail(String email){
        this.email = email;
    }
    public void setAvatar(String avatar){
        this.avatar = avatar;
    }
}