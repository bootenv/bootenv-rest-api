import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds, loadIds } from '../../server/utils/get-ids';

function getFilter(results) {
  return !!results.length && { projectId: { inq: getIds(results) } };
}

export default function(Environment) {
  acl.checkAccess(Environment, () => app.models.Project.find().then(getFilter));

  Environment.variables = (id, ext, cb) => {
    Environment.findById(id).then(env =>
        app.models.Project.findById(env.projectId).then(project => {
          let variables = {};

          for (let x of project.variables) {
            variables[x.name] = x.value;
          }

          for (let x of env.variables) {
            variables[x.name] = x.value;
          }

          let res = '';
          switch (ext) {
            case 'env':
              for (let x of Object.keys(variables)) {
                res += x.replace(/ /g, '_') + '=' + variables[x] + '\n';
              }
              break;
            case 'yaml':
            case 'yml':
              for (let x of Object.keys(variables)) {
                res += x + ': ' + variables[x] + '\n';
              }
              break;
            case 'csv':
              for (let x of Object.keys(variables)) {
                //jscs:disable
                res += "'" + x.replace(/'/g, "''") + "','" + variables[x].replace(/'/g, "''") + "'\n"; // jshint ignore:line
                //jscs:enable
              }
              break;
            default:
              // JSON
              res = variables;
          }
          cb(null, res);
        })
    ).catch(cb);
  };

  Environment.remoteMethod(
    'variables',
    {
      http: { path: '/:id/variables.:ext', verb: 'get' },
      accepts: [
        { arg: 'id', type: 'string' },
        { arg: 'ext', type: 'string' }
      ],
      returns: { arg: 'variables', type: 'string', root: true }
    }
  );

  Environment.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'tokenIds', app.models.EnvironmentToken, 'environmentId')
      .then(next)
      .catch(next));

  Environment.afterRemote('variables', (ctx, inst/*, next*/) => {
    ctx.res.header('Content-Type', 'text/plain');
    ctx.res.end(inst);
  });
}

