export type Role = 'owner' | 'kasir'

export interface MenuItem {
  label: string
  to: string
  roles: Role[]
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    roles: ['owner', 'kasir'],
  },
  {
    label: 'Produk',
    to: '/products',
    roles: ['owner'],
  },

  {
  label: 'Transaksi',
  to: '/transactions',
  roles: ['kasir', 'owner'],
},

{
  label: 'Riwayat Transaksi',
  to: '/transactions/history',
  roles: ['owner'],
},
{
  label: 'Laporan',
  to: '/reports',
  roles: ['owner'],
},

{
  label: 'Stok Masuk',
  to: '/stock-in',
  roles: ['owner'],
},
{
  label: 'Supplier',
  to: '/suppliers',
  roles: ['owner'],
},

]
