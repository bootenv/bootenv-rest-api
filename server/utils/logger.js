import environment from './environment';
import winston from 'winston';

var config = {
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  },
  transports: [],
  exitOnError: false
};

if (environment.isProd()) {
  config.transports.push(
    new winston.transports.Console({
      level: 'warn'
    })
  );
} else {
  config.transports.push(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      timestamp: true,
      stringify: false,
      json: false,
      prettyPrint: true,
      colorize: true,
      silent: false,
      humanReadableUnhandledException: true
    })
  );
}

var log = new winston.Logger(config);

winston.emitErrs = true;

log.debug('Running on [%s] environment.', environment.getName());

export default log;
