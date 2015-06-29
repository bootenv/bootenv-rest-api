import { environment } from 'bootenv';
import winston from 'winston';

const LOG_LEVEL = 'LOG_LEVEL';
const CONFIG = {
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

var environmentName = environment.getName();
if (environmentName !== 'development') {
  CONFIG.transports.push(
    new winston.transports.Console({
      level: environment.getPropertyOr(LOG_LEVEL, 'warn')
    })
  );
} else {
  CONFIG.transports.push(
    new winston.transports.Console({
      level: environment.getPropertyOr(LOG_LEVEL, 'debug'),
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

log.debug('Running on [%s] environment.', environmentName);

export default log;

