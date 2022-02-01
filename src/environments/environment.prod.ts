export const environment = {
  production: true,
  domain: 'https://appmoney-api.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [ /\/oauth\/token/ ]
};
