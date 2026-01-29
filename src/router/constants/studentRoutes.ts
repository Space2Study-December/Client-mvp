import { authRoutes } from '~/router/constants/authRoutes'

export const findOffersChildRoutes = [
  { route: 'categories', path: authRoutes.categories.route },
  { route: 'findOffers', path: authRoutes.findOffers.path }
]

export const studentRoutes = {
  navBar: {
    // home: { route: '/', path: '/' },
    findOffers: {
      route: 'findOffers',
      path: authRoutes.categories.path
    },
    // categories: { route: 'categories', path: authRoutes.categories.path },
    // howItWorks: { route: 'how-it-works', path: '/student/#how-it-works' },
    faq: { route: 'faq', path: '/student/#faq' }
  }
}
