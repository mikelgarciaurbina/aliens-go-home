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
    this.currentPlayer = null;
    this.socket = null;
    this.emitNewScore = this.emitNewScore.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  emitNewScore(nextProps, props) {
    if (!nextProps.gameState.started && props.gameState.started) {
      if (this.currentPlayer.maxScore < props.gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: props.gameState.kills,
        });
      }
    }
  }

  handleAuthentication({ leaderboardLoaded, loggedIn }) {
    const self = this;

    this.auth0.parseHash((err, authResult) => {
      if (err || !authResult) {
        return console.log(err);
      }

      this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
        self.currentPlayer = {
          id: user.sub,
          maxScore: 0,
          name: user.name,
          picture: user.picture,
        };

        loggedIn(self.currentPlayer);

        self.socket = io('http://localhost:3001', {
          query: `token=${authResult.accessToken}`,
        });

        self.socket.on('players', players => {
          leaderboardLoaded(players);

          players.forEach(player => {
            if (player.id === self.currentPlayer.id) {
              self.currentPlayer.maxScore = player.maxScore;
            }
          });
        });
      });
    });
  }

  login() {
    this.auth0.authorize();
  }
}
