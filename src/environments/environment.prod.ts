export const environment = {
  production: true,
  domain: 'https://appmoney-api.herokuapp.com',
  tokenAllowedDomains: [ /appmoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [ /\/oauth\/token/ ]
};
