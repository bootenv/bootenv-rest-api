import loopback from 'loopback';

export default function(app) {
  app.use(app.get('restApiRoot'), app.loopback.rest());

  app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
  }));
}

