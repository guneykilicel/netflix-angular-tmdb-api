declare var google: any;
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private router = inject(Router);

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: '189300348998-lidppnk88k2imdsbv0miip5322k1d188.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLogin(response)
      }
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "filled", size: "large", shape: "rectangle", width: 350 }
    )
  }

  private decodeToken(token: string) {
    const decodedToken = decodeURIComponent(atob(token.split('.')[1]).split('').map((c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(decodedToken);
}


  handleLogin(response: any) {
    if(response) {
      // decode the token
      const payload = this.decodeToken(response.credential)
      // store in session
      sessionStorage.setItem("LoggedInUser", JSON.stringify(payload))
      // navigate to home/browse
      this.router.navigate(['browse'])
    }
  }
}
