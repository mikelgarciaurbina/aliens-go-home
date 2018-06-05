const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

const client = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://mikelgarciaurbina.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://aliens-go-home.digituz.com.br',
  issuer: 'https://mikelgarciaurbina.eu.auth0.com/',
  algorithms: ['RS256'],
});

app.use(client);

const players = [];

const newMaxScoreHandler = payload => {
  let foundPlayer = false;
  players.forEach(player => {
    if (player.id === payload.id) {
      foundPlayer = true;
      player.maxScore = Math.max(player.maxScore, payload.maxScore);
    }
  });

  if (!foundPlayer) {
    players.push(payload);
  }

  io.emit('players', players);
};

io.on('connection', socket => {
  io.emit('players', players);

  socket.on('new-max-score', newMaxScoreHandler);
});

http.listen(3001, () => {
  console.log('listening on port 3001');
});
