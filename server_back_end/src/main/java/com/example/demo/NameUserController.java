package com.example.demo;

import java.io.Console;
import java.util.Collection;
import java.util.List;
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
    private UserRepository uRepo;
    private ScoreRepository sRepo;

    public NameUserController(UserRepository rep, ScoreRepository rep2){
        this.uRepo = rep;
        this.sRepo = rep2;
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
        return this.uRepo.findByUsername("John");
    }

    //Log user in (username, password)
    @RequestMapping(
        value = "/find", 
        method = {RequestMethod.GET, RequestMethod.POST})
    @CrossOrigin(origins = "http://localhost:4200")
    public User fUser(@RequestBody User u){
        User checkedUser = this.uRepo.findByUsername(u.getUsername());
        
        //System.out.println(passwordEncoder().encode(u.getPsw()));

        if (BCrypt.checkpw(u.getPsw(), checkedUser.getPsw())){
            System.out.println("Plaintext: "+u.getPsw()+", BCrypt: "+checkedUser.getPsw()+" - match");
            return this.uRepo.findByUsername(u.getUsername());
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
        user.setEmail(u.getEmail());
        this.uRepo.save(user);
    }

    //Get User Progress Data
    @RequestMapping(
        value = "/getProgress",
        method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Score> getProgress(@RequestBody int uid){
        return sRepo.findAllByUid(Long.valueOf(uid));
    }

    /* public Collection<User> nameUser(){
        return uRepo.findAll().stream()
                    .filter(this::isName)
                    .collect(Collectors.toList());
    } */

    /*private boolean isName(User u){
        return u.getUsername().equals("Jane");
    }*/
}