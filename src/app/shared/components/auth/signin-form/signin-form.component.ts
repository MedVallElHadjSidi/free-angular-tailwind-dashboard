
import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
// import { CheckboxComponent } from '../../form/input/checkbox.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    RouterModule,
    ReactiveFormsModule,  
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule
],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {

  showPassword = false;
  isChecked = false;

  email = '';
  password = '';
  username = '';
  loading = false
  error: string | null = null;

  constructor(private authService: AuthService) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    console.log('username:', this.username);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.isChecked);
      if (!this.username || !this.password) {
      this.error = 'Username et mot de passe requis';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.handleLoginSuccess(response);
      },
      error: () => {
        this.loading = false;
 
      }
    });
  }
}
