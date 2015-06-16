class Environment {
  constructor() {
    this.name = (process.env.NODE_ENV || 'development');
  }

  getName() {
    return this.name;
  }

  isDev() {
    return this.name === 'development';
  }

  isProd() {
    return this.name === 'production';
  }
}

export default new Environment();

