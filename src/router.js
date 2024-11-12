// src/router.js
import { Router } from '@vaadin/router';

export const initRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    { path: '/', component: 'home-page' },
    { path: '/employees', component: 'employee-list' },
    { path: '/employees/new', component: 'add-new-employee' },
    { path: '/employees/edit', component: 'add-new-employee' },
    { path: '(.*)', redirect: '/' }
  ]);

};
