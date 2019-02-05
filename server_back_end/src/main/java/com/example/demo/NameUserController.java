package com.example.demo;

import java.util.Collection;
import java.util.stream.Collectors;

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
    private User user;

    public NameUserController(UserRepository rep){
        this.repository = rep;
    }

    @GetMapping("/name-users")
    @CrossOrigin(origins = "http://localhost:4200")
    public User findUser(){
        return this.repository.findByUsername("John");
    }

    @RequestMapping(
        value = "/find", 
        method = {RequestMethod.GET, RequestMethod.POST})
    @CrossOrigin(origins = "http://localhost:4200")
    public User fUser(@RequestBody User u){
        User checkedUser = this.repository.findByUsername(u.getUsername());
        
        if (checkedUser.getPsw().equals(u.getPsw())){
            return this.repository.findByUsername(u.getUsername());
        }
        else { return null; }
        
    }
    /* public Collection<User> nameUser(){
        return repository.findAll().stream()
                    .filter(this::isName)
                    .collect(Collectors.toList());
    } */

    private boolean isName(User u){
        return u.getUsername().equals("Jane");
    }
}