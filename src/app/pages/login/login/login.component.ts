import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth/authService.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  key = 'czB6yjT6rgEG5bkEDKGwRzqVmZx5ciTa';

  /**
   *
   */
  constructor(private fb: FormBuilder,private router: Router,private authService: AuthServiceService,private _cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const originalText = this.loginForm.value.password;
      const encryptedText = this.xorCipher(originalText, this.key);
      this.authService.login(email, encryptedText).subscribe({
        next: (response) => {
          //console.log('Login successful', response);
          this._cookieService.set('usrLogtkn', response.token);
          //console.log('token', this._cookieService.get('usrLogtkn'));
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Login failed', error);
          // Mostrar mensaje de error
        }
      });
    }
  }


  xorCipher(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      // Cifra y descifra usando XOR entre el carácter del texto y el carácter de la clave
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

}
