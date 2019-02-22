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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class NameUserController{
    private UserRepository uRepo;
    private ScoreRepository sRepo;
    private TutorialRepository tRepo;

    public NameUserController(UserRepository rep, ScoreRepository rep2, TutorialRepository rep3){
        this.uRepo = rep;
        this.sRepo = rep2;
        this.tRepo = rep3;
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
            System.out.println("Plaintext: "+u.getPsw()+", PlainHash: "+ passwordEncoder().encode(u.getPsw()) +"BCrypt: "+checkedUser.getPsw()+" - match");
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
        return sRepo.findAllByUidOrderByTimestmp(Long.valueOf(uid));
    }

    //Save User Progress Data
    @RequestMapping(
        value="/saveProgress", 
        method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public int saveProgress(@RequestBody Score s) {
        Score score = new Score();
        score.setUId(s.getUId());
        score.setTutorial(this.tRepo.findById(s.tid).get());
        score.setDate(s.getDate());
        this.sRepo.save(score);
        return 1;
    }

    //Delete User Progress Date
    @RequestMapping(value="/deleteProgress", method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public void deleteProgress(@RequestBody Score s) {
        this.sRepo.deleteByTutorialAndUid(this.tRepo.findById(s.tid).get(), s.getUId());
    }
    

    //Get SUM(user scores)
    @RequestMapping(value="/scoreSum", method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public int getScoreSum(@RequestBody int uid) {
        return this.sRepo.findByUid((long) uid);
    }
    
    //Find score entry by tid and uid
    @RequestMapping(value="/tutorialChecked", method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean getScoreEntry(@RequestBody Score s){
        if(this.sRepo.findByTutorialAndUid(this.tRepo.findById(s.tid).get(), s.getUId()) != null){
            return true;
        }        
        return false;
    }

    //Get tutorial by name
    @RequestMapping(value="/getTutorial", method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean checkIfExists_t(@RequestBody String tTitle) {
        if(tRepo.findByTitle(tTitle) != null){
            return true;
        }
        return false;
    }

    //Add tutorial info
    @RequestMapping(value="/saveTutorial", method=RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public Long saveTutorial(@RequestBody Tutorial t) {
        Tutorial tutorial = new Tutorial();
        tutorial.setLevel(t.getLevel());
        tutorial.setPoints(t.getPoints());
        tutorial.setTitle(t.getTitle());
        tRepo.save(tutorial);
        return tutorial.getId();
    }
    

    //Get Tutorial Info
    /*@RequestMapping(
        value="/getTutorial", 
        method={RequestMethod.GET, RequestMethod.POST})
    @CrossOrigin(origins = "http://localhost:4200")
    public Tutorial getTutorial(@RequestBody int id){
        return this.tRepo.findById((long) id).get();
    }*/

    /* public Collection<User> nameUser(){
        return uRepo.findAll().stream()
                    .filter(this::isName)
                    .collect(Collectors.toList());
    } */

    /*private boolean isName(User u){
        return u.getUsername().equals("Jane");
    }*/
}