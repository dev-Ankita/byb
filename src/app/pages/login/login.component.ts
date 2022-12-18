import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { UserService } from 'src/app/service/user.service';
import { EncryptionService } from 'src/app/service/utility/encryption.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isVisiblePassword: boolean = false;
  pwdPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$";
  logInForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/)]);
  password = new FormControl('', [Validators.required,Validators.pattern(this.pwdPattern)]);

  logInCredentials: any;
  encryptedPass: string ='';

 
  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private storage: LocalstorageService,
    private encrypt: EncryptionService

  ) {
    this.logInForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }
  ngOnInit(): void { }

  toggleIsVisiblePassword() {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  async loginUser(logInForm: FormGroup) {
    LoaderService.showLoader();
    this.encryptedPass = this.encrypt.encryption(this.logInForm.get('password')?.value);

    var credentials = {
      userId: 0,
      emailId: this.logInForm.get('email')?.value,
      password: this.encryptedPass,

    };

    var userDetails = (await lastValueFrom(this.userservice.getUserCredentialData(credentials)))?.result;
    if(userDetails!=null && userDetails!=undefined)
    {
      this.storage.saveUser({ email: userDetails.emailId, userid: userDetails.userId, firstname: userDetails.firstName, lastname: userDetails.lastName });
      this.storage.saveUserId(userDetails.userId);
      this.toastr.success('Log In Successfull !');
      this.route.navigate(['/dashboard/reports']);
    }
    else
    {
      this.toastr.error('Email-Id or Password is wrong !');
    }

    LoaderService.hideLoader();
  }


}



