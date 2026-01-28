export const URLs = {
  example: {
    get: '/example'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    get: '/users',
    update: '/users',
    delete: '/users/delete',
    myProfile: '/users/myProfile'
  },
  categories: {
    get: '/categories',
    getNames: '/categories/names',
    getCategories: '/categories/getCategories',
    getAllCategories: '/categories/getAllCategories',
    priceRange: '/price-range'
  },
  subjects: {
    get: '/subjects',
    getSubjectsByCategoryId: '/subjects/filterBy',
    getNames: '/subjects/names',
    createSubject: '/subjects/createSubject'
  },
  resources: {
    questions: {
      get: '/questions',
      delete: '/questions',
      post: '/questions',
      patch: '/questions'
    },
    resourcesCategories: {
      get: '/resources-categories',
      getNames: '/resources-categories/names',
      patch: '/resources-categories',
      post: '/resources-categories',
      delete: 'resources-categories'
    }
  }
}
