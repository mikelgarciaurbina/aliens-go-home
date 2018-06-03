import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'mikelgarciaurbina.eu.auth0.com',
      clientID: 'U2sb3nlpOP6oPdsDqZEwh66WRYfdymq1',
      redirectUri: 'http://localhost:3000/',
      audience: 'https://mikelgarciaurbina.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile manage:points',
    });
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
    });
  }

  login() {
    this.auth0.authorize();
  }
}
