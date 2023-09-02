const apiPath = '/api/v1';

export default {
  chatPagePath: () => '/',
  loginApiPath: () => [apiPath, 'login'].join('/'),

  loginPagePath: () => '/login',
};