package com.example.demo;

import java.io.Console;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

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
    private QuestionRepository qRepo;
    private AnswerRepository aRepo;
    private QuizResultRepositroy qrRepo;

    public NameUserController(UserRepository rep, ScoreRepository rep2, TutorialRepository rep3, QuestionRepository rep4, AnswerRepository rep5, QuizResultRepositroy rep6){
        this.uRepo = rep;
        this.sRepo = rep2;
        this.tRepo = rep3;
        this.qRepo = rep4;
        this.aRepo = rep5;
        this.qrRepo = rep6;
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
        try{
            User checkedUser = this.uRepo.findByUsername(u.getUsername());
            //System.out.println(passwordEncoder().encode(u.getPsw()));

            if (BCrypt.checkpw(u.getPsw(), checkedUser.getPsw())){
                //System.out.println("Plaintext: "+u.getPsw()+", PlainHash: "+ passwordEncoder().encode(u.getPsw()) +"BCrypt: "+checkedUser.getPsw()+" - match");
                return this.uRepo.findByUsername(u.getUsername());
            }
            else { return null; }
        }
        catch(Exception e){
            return null;
        }

        
    }

    //Register User
    @RequestMapping(
        value = "/save",
        method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean saveUser(@RequestBody User u){
        User user = new User();
        user.setUsername(u.getUsername());
        user.setPassword(passwordEncoder().encode(u.getPsw()));
        user.setEmail(u.getEmail());
        user.setAvatar(u.getAvatar());
        try{
        this.uRepo.save(user);
        return true;
        } catch(Exception e) {
            return false;
        }
    }

    //Get User Progress Data
    @RequestMapping(
        value = "/getProgress",
        method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Score> getProgress(@RequestBody int uid){
        return sRepo.findAllByUidOrderByTimestmp((long)uid);
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
    
    //Get top 10 users
    @RequestMapping(value="/leaderBoard")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Object> getTop(){
        return sRepo.findAllTop();
       /* HashMap<Integer,String> map = new HashMap<>();
        List<Object[]> result = sRepo.findAllTop();
       for (Object[] em: result ) {
           map.put(em[0], em[1]);
       }*/
    }

    //get quiz options
    @RequestMapping(value="/getQuestion", method={RequestMethod.GET, RequestMethod.POST})
    @CrossOrigin(origins = "http://localhost:4200")
    public Question getQuestion(@RequestBody int qId){
        return qRepo.findByQuestionID(1);
    }

    //getAnswers
    @RequestMapping(value="/getAnswers")
    @CrossOrigin(origins = "http://localhost:4200")
    public Iterable<Answer> getAnswers(){
        return aRepo.findAll();
    }

    //add quiz result
    @RequestMapping(value="/saveQuizResult")
    @CrossOrigin(origins = "http://localhost:4200")
    @JsonProperty("data")
    public Boolean saveQuizR(@RequestBody JsonNode data){        

        User returnedUser = this.uRepo.findById(data.get("uid").asLong()).get();
        QuizResult qr = new QuizResult();
        qr.setUser(returnedUser);
        qr.setResult(data.get("result").asDouble());
        try{
            qrRepo.save(qr);
            return true;
        }catch(Exception e){return false;}
    }

    //update quiz result
    @RequestMapping(value="/updateQuizResult")
    @CrossOrigin(origins = "http://localhost:4200")
    @JsonProperty("data")
    public Boolean updateQuizR(@RequestBody JsonNode data){        

        User returnedUser = this.uRepo.findById(data.get("uid").asLong()).get();
        QuizResult qr = qrRepo.findByUser(returnedUser);
        qr.setResult(data.get("result").asDouble());
        try{
            qrRepo.save(qr);
            return true;
        }catch(Exception e){return false;}
    }

    //get quiz result
    @RequestMapping(value="/getQuizResult", method = {RequestMethod.POST}, 
    consumes = {"application/json"})
    @CrossOrigin(origins = "http://localhost:4200")
    public QuizResult getQuizR(@RequestBody int uid){
        User returnedUser = this.uRepo.findById((long) uid).get();
        return qrRepo.findByUser(returnedUser);
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