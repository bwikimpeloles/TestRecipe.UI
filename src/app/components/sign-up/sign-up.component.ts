import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  public accounts: any=[];
  public role: string="";
  

  constructor(private formBuilder: FormBuilder, public testRecipeService: TestRecipeService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],

    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";

  }

  onLogin(){
    if(this.loginForm.valid){
      //debugger
      //send object to db 
      console.log(this.loginForm.value);
      this.testRecipeService.Login(this.loginForm.value).subscribe({
        next:(res) => {
          this.loginForm.reset();
          this.testRecipeService.storeToken(res.token);//token must be store first inside local storage
          const userPayload = this.testRecipeService.decodedToken();

          debugger
          console.log("hi, this is your sid " +userPayload.actort);
          debugger
          let roleFromToken = userPayload.role;
          debugger
            //debugger
            this.role = roleFromToken
            alert(res.message);
            //this.testRecipeService.storeToken(res.token); 
            //this was previous position, of this line, thats why roleFromToken was undefined before 
            if (this.role=="Admin"){
              this.router.navigate(['adminhome'])
            } else {
              this.router.navigate(['userhome'])
            } 
          
        },
        error:(err)=>{
          alert(err?.error.message);
        }
      })
    }

    //throw error using toaster with required fields
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }

  onSignUp(){
    if(this.signUpForm.valid){
      //send object to db 
      console.log(this.signUpForm.value);
      this.testRecipeService.SignUp(this.signUpForm.value).subscribe({
        next:(res=> {
          alert(res.message);
          this.signUpForm.reset();
          window.location.reload();
          this.router.navigate(['login']); 
        }),
        error: (err=>
          alert(err?.error.message) ) 
      })
    }

    //throw error using toaster with required fields
    else{
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }





}
