import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user';
import { ProgressTrackService } from '../shared/progress/progressTrack.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: User = new User()
  showName: boolean;
  username: string;
  password: string;
  score: number;
  firstLogin: Boolean =false;

  pswInL: boolean = true;
  pswInR: boolean = true;
  errorL: boolean = false;
  errorR: boolean = false;
  errMsg: string =""

  //registration form elements
  regForm: FormGroup;
  rName: string;
  rEmail: string;
  rPsw: string;
  radioBtn: string;
  img: string;
  @ViewChild('loginForm') loginForm: FormControl 

  constructor(private userService: UserService, private ptService: ProgressTrackService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.cd.detectChanges();
    if (this.userService.loggedIn()) {
      this.user.username = localStorage.getItem("userName");

      if(localStorage.getItem("userScore")){
        this.user.score = Number(localStorage.getItem("userScore"))
      }
      else{
        //in case score has been manually deleted from localStorage
        this.ptService.getUserScore(this.user.uid)
          .subscribe(score => {
            this.user.score = score;
            localStorage.setItem("userScore", score.toString());
          }) 
      }
      this.showName = true;   
    }
    else {
      this.showName = false;
    }
    console.log("The user onInit: ",this.user)
    console.log("JWT onInit(): " + localStorage.getItem('access_token'));

  }

  logout() {
    this.showName = false;
    this.userService.logout();
    this.user = null;
    this.username = '';
    this.password = '';
    this.loginForm.reset();
    console.log("JWT logout(): " + localStorage.getItem('access_token'));
  }

  //login
  onSubmit() {
    
      //this.userService.assignUserData(this.username, this.password);
      this.userService.checkUser(this.username, this.password)
      .subscribe(object => {
        if(object){
          this.errorL = false; this.errorR = false;
          this.errMsg = ""
         //console.log(object)
          this.user = object;
          localStorage.setItem("userName", this.user.username);
          localStorage.setItem("uid", this.user.uid.toString());
          localStorage.setItem("image", this.user.avatar);
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("email",this.user.email)
          this.showName = true;  

          if (this.firstLogin){
            this.ptService.saveChecked(this.user.uid, 0, new Date()).subscribe();
          }

          this.ptService.getUserScore(this.user.uid)
          .subscribe(score => {
            this.user.score = score;
            localStorage.setItem("userScore", score.toString());
          }) 
        }
        else{
          this.cd.detectChanges();
          this.errMsg = "Incorrect login details"
          this.errorL = true;
          console.log("loginERR - ",this.errorL)
        }
      });  

      
  }

  onRegister(){
    if (this.radioBtn == 'girl'){
      this.img ='../../assets/katie.png'
    } 
    else {this.img ='../../assets/bughunt.png'}
    this.userService.registerUser(this.rName, this.rPsw, this.rEmail, this.img).subscribe(obj =>
      {
        if(obj){
          this.errorR = false; this.errorL = false;
          this.errMsg = ""

          this.userService.checkUser(this.rName, this.rPsw)
          .subscribe(object => {
            if(object){
             //console.log(object)
              this.user = object;
              localStorage.setItem("userName", this.user.username);
              localStorage.setItem("uid", this.user.uid.toString());
              localStorage.setItem("image", this.user.avatar);
              localStorage.setItem("authenticated", "true");
              this.showName = true;  

                this.ptService.saveChecked(this.user.uid, 0, new Date()).subscribe();

    
              this.ptService.getUserScore(this.user.uid)
              .subscribe(score => {
                this.user.score = score;
                localStorage.setItem("userScore", score.toString());
              }) 
            }
          });  
        }else{
          this.cd.detectChanges();
          this.errorR = true;
          this.errMsg = "Email has been used to register before"
          console.log("regERR - ",this.errorR)
        }
      })
    

  }

}
