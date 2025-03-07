import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? (jwtDecode(token) as JwtPayload) : null; 
  }
  // Checks if the user is logged in


  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    const decoded = jwtDecode(token) as JwtPayload;
    if (decoded.exp) {
      return decoded.exp < Date.now() / 1000;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // Save the token to localStorage
    localStorage.setItem('id_token', idToken);
    // Redirect to the homepage
    window.location.assign('/');
  
  }

  logout() {

    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token'); 

    // TODO: redirect to the login page
    window.location.assign('/login');
  
   
  }
}

export default new AuthService();
