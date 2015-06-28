import environment from 'bootenv';
import winston from 'winston';

var LOG_PROPERTY = 'LOG';
var LOG_LEVEL_PROPERTY = 'LOG_LEVEL';
var CONFIG = {
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

if (!environment.supportsOr(LOG_PROPERTY, true)) {
  CONFIG.transports.push(
    new winston.transports.Console({
      level: environment.getPropertyOr(LOG_LEVEL_PROPERTY, 'warn')
    })
  );
} else {
  CONFIG.transports.push(
    new winston.transports.Console({
      level: environment.getPropertyOr(LOG_LEVEL_PROPERTY, 'debug'),
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

var log = new winston.Logger(CONFIG);

winston.emitErrs = true;

log.debug('Running on [%s] environment.', environment.getName());

export default log;

