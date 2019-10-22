import React from 'react';

const Login = React.lazy(() => import('../src/components/views/Login/login'));
const Signup = React.lazy(() => import('../src/components/views/SignUp/signup'));
const Home = React.lazy(() => import('../src/components/Home/home'));
const Cuestions = React.lazy(() => import('../src/components/addCuestions/cuestions'));

const Dashboard = React.lazy(() => import('../src/components/dashboard/dashboard'));



const routes = [

  { path: '/login', exact: true, name: 'Login', component:Login},
  { path: '/signup', exact: true, name: 'Signup', component:Signup},
  { path: '/Home', exact: true, name: 'Home', component:Home},
  { path: '/cuestions', exact: true, name: 'Cuestions', component:Cuestions},
  { path: '/Dashboard', exact: true, name: 'Dashboard', component:Dashboard},

];

export default routes;  







