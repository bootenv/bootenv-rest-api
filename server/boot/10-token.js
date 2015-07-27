export default function(app) {
  app.use('/env', (req, res/*, next*/) => {
    var parts = req.url.substring(1).split('.');
    app.models.EnvironmentToken.findById(parts[0]).then(token =>
        app.models.Environment.variables(token.environmentId, parts[1], (err, vars) => {
          if (err) {
            throw err;
          }

          res.write(vars);
          res.end();
        })
    ).catch((reason) => {
      res.write(reason);
      res.end();
    });
  });
}

