export const APP_ROUTES = {
  private: {
    config: {
      name: 'dashboard/user/config',
    },
    perfil: {
      name: 'dashboard/user/profile',
    },
    password: {
      name: 'dashboard/user/password',
    },
    configAccount: {
      name: '/auth/config',
    },
  },

  public: {
    landingPage: '/',
    signIn: '/auth/sign-in',
    register: '/auth/register',
    'reset-password-verify-cpf': '/auth/reset-password/validate-cpf',
    'reset-password-verify-code': '/auth/reset-password/verify-code',
    'reset-password-change-password': '/auth/reset-password/change-password',
  },
}
