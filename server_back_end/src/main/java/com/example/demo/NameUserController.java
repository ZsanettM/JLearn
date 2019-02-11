package com.example.demo;

import java.io.Console;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class NameUserController{
    private UserRepository repository;

    public NameUserController(UserRepository rep){
        this.repository = rep;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
/*
    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
*/
    @GetMapping("/name-users")
    @CrossOrigin(origins = "http://localhost:4200")
    public User findUser(){
        return this.repository.findByUsername("John");
    }

    //Log user in (username, password)
    @RequestMapping(
        value = "/find", 
        method = {RequestMethod.GET, RequestMethod.POST})
    @CrossOrigin(origins = "http://localhost:4200")
    public User fUser(@RequestBody User u){
        User checkedUser = this.repository.findByUsername(u.getUsername());
        
        //System.out.println(passwordEncoder().encode(u.getPsw()));

        if (BCrypt.checkpw(u.getPsw(), checkedUser.getPsw())){
            System.out.println("Plaintext: "+u.getPsw()+", BCrypt: "+checkedUser.getPsw()+" - match");
            return this.repository.findByUsername(u.getUsername());
        }
        else { return null; }
        
    }

    //Register User
    @RequestMapping(
        value = "/save",
        method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public void saveUser(@RequestBody User u){
        User user = new User();
        user.setUsername(u.getUsername());
        user.setPassword(passwordEncoder().encode(u.getPsw()));
        user.setScore(u.getScore());
        this.repository.save(user);
    }

    /* public Collection<User> nameUser(){
        return repository.findAll().stream()
                    .filter(this::isName)
                    .collect(Collectors.toList());
    } */

    /*private boolean isName(User u){
        return u.getUsername().equals("Jane");
    }*/
}