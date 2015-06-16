import loopbackPassport from 'loopback-component-passport';
import providers from './auth-providers.json';

export default function setupPassport(app) {
  let passportConfigurator = new loopbackPassport.PassportConfigurator(app);

  passportConfigurator.init();

  passportConfigurator.setupModels({
    userModel: app.models.User,
    userIdentityModel: app.models.UserIdentity,
    userCredentialModel: app.models.UserCredential
  });

  for (let [provider, config] of Object.entries(providers)) {
    config.session = !!config.session;
    passportConfigurator.configureProvider(provider, config);
  }
}

