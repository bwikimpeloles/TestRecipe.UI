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
  

  // constructor(private formBuilder: FormBuilder, public testRecipeService: TestRecipeService,private router: Router) {
  //   this.authForm = this.formBuilder.group({
  //     fullname: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //     password: ['', [Validators.required]],
  //   });
  //   this.authForm2 = this.formBuilder.group({
  //     email: ['', [Validators.required]],
  //     password: ['', [Validators.required]],
  //     rememberMe: false
  //   });
  // }

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
      debugger
      //send object to db 
      console.log(this.loginForm.value);
      this.testRecipeService.Login(this.loginForm.value).subscribe({
        next:(res) => {
          this.testRecipeService.getRoleFromStore().subscribe(val =>{
            this.testRecipeService.storeToken(res.token);//token must be store first inside local storage
            let roleFromToken = this.testRecipeService.getRoleFromToken();
            this.role = val || roleFromToken

            alert(res.message);
            debugger
            //this.testRecipeService.storeToken(res.token); 
            //this was previous position, of this line, thats why roleFromToken was undefined before 
            if (this.role=="Admin"){
              this.router.navigate(['adminhome'])
            } else {
              this.router.navigate(['userhome'])
            } 
          });
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



  // signUp(user: User){
  //   if (!this.authForm.valid) return;

  //   //Enable loader
  //   this.loading = true;
  //   //Set user role id to 1 for admin role
  //   user.roleId = 1;
  //   return this.testRecipeService.signUp(user).subscribe(
  //     user => {
  //       //Add user data to local storage
  //       localStorage.setItem('user', JSON.stringify(user));
  //       // Redirect user to protected route
  //       this.router.navigateByUrl('/home');
  //     },error => {
  //       // If error
  //       console.log(error);
  //       //Show error message to user
  //       //If user already exist, 409 => Conflit
  //       if (error.status === 409){
  //         this.errorMessage = "This email is already registered!";
  //       }else{
  //         this.errorMessage = "Something went wrong. Please try again!";
  //       }
  //       //Disable loader
  //       this.loading = false;
  //     }
  //   );
  // }

  // signIn(user: User){
  //   if (!this.authForm2.valid) return;
  //   //Enable loader
  //   this.loading = true;
  //   return this.testRecipeService.signIn(user).subscribe(
  //     user => {
  //       this.loading = false;
  //        //Add user data to local storage
  //        localStorage.setItem('user', JSON.stringify(user));
  //        // Redirect user to protected route
  //        this.router.navigateByUrl('/home');
  //     },error => {
  //       // If error
  //       console.log(error);
  //       //Show error message to user
  //       this.errorMessage = "Login failed. Please try again!";
  //       //Disable loader
  //       this.loading = false;
  //     }
  //   );
  // }

}
