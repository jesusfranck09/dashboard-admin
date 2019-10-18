import React from 'react';

const Login = React.lazy(() => import('../src/components/views/Login/login'));
const Signup = React.lazy(() => import('../src/components/views/SignUp/signup'));
const Home = React.lazy(() => import('../src/components/Home/home'));



const routes = [

  { path: '/login', exact: true, name: 'Login', component:Login},
  { path: '/signup', exact: true, name: 'Signup', component:Signup},
  { path: '/Home', exact: true, name: 'Home', component:Home},
];

export default routes;  







