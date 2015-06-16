import loopbackPassport from 'loopback-component-passport';
import providers from './auth-providers.json';

export default function setupPassport(app) {
  let passportConfigurator = new loopbackPassport.PassportConfigurator(app);

  passportConfigurator.init();

  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
  });

  for (let [provider, config] of Object.entries(providers)) {
    config.session = !!config.session;
    passportConfigurator.configureProvider(provider, config);
  }
}

