export default function(app) {
  app.use(app.get('restApiRoot'), app.loopback.rest());
}

