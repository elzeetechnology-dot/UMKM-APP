import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import { useAuthStore } from '../stores/auth'
import TransactionsView from '../views/TransactionsView.vue'
import TransactionHistoryView from '../views/TransactionHistoryView.vue'
import ReportsView from '../views/ReportsView.vue'
import StockInView from '../views/StockInView.vue'
import SupplierView from '../views/SupplierView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ======================
    // AUTH
    // ======================
    {
      path: '/login',
      component: LoginView,
    },

    // ======================
    // DASHBOARD (PROTECTED)
    // ======================
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: HomeView,
          meta: {
            requiresAuth: true,
            roles: ['owner', 'kasir'],
          },
        },
        {
          path: 'products',
          component: ProductsView,
          meta: {
            requiresAuth: true,
            roles: ['owner'], // 🔐 hanya owner
          },
        },
        {
  path: 'transactions',
  component: TransactionsView,
  meta: {
    requiresAuth: true,
    roles: ['kasir', 'owner'],
  },
},

{
  path: 'transactions/history',
  component: TransactionHistoryView,
  meta: {
    requiresAuth: true,
    roles: ['owner'], // 🔐 owner saja
  },
},

{
  path: 'reports',
  component: ReportsView,
  meta: {
    requiresAuth: true,
    roles: ['owner'],
  },
},

{
  path: 'stock-in',
  component: StockInView,
  meta: { requiresAuth: true, roles: ['owner'] },
},
{
  path: 'suppliers',
  component: SupplierView,
  meta: { requiresAuth: true, roles: ['owner'] },
},
      ],
    },
  ],
})

// ======================
// GLOBAL ROUTE GUARD
// ======================
router.beforeEach((to) => {
  const auth = useAuthStore()

  // 🔐 belum login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }

  // 🔒 role-based access
  if (to.meta.roles && auth.user) {
    const allowedRoles = to.meta.roles as string[]
    if (!allowedRoles.includes(auth.user.role)) {
      return '/' // redirect aman
    }
  }
})

export default router
