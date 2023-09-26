import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ChangePwd = React.lazy(() => import('./views/login/ChangePwd'))


const routes = [
  { path: '/', exact: true, name: 'Login' },    
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, },
  { path: '/login/changepwd', name: 'ChangePwd', element: ChangePwd,}


]

export default routes
