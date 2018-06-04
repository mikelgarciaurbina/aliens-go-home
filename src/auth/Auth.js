import auth0 from 'auth0-js';
import io from 'socket.io-client';

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
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication({ leaderboardLoaded, loggedIn }) {
    this.auth0.parseHash((err, authResult) => {
      if (err || !authResult) {
        return console.log(err);
      }

      this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
        const currentPlayer = {
          id: user.sub,
          maxScore: 0,
          name: user.name,
          picture: user.picture,
        };

        loggedIn(currentPlayer);


        const socket = io('http://localhost:3001', {
          query: `token=${authResult.accessToken}`,
        });

        let emitted = false;
        socket.on('players', (players) => {
          leaderboardLoaded(players);

          if (emitted) return;
          socket.emit('new-max-score', {
            id: user.sub,
            maxScore: 120,
            name: user.name,
            picture: user.picture,
          });
          emitted = true;
          setTimeout(() => {
            socket.emit('new-max-score', {
              id: user.sub,
              maxScore: 222,
              name: user.name,
              picture: user.picture,
            });
          }, 5000);
        });
      });
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    return new Date().getTime() < expiresAt;
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
