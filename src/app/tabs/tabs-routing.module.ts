import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('../blogs/blogs.module').then( m => m.BlogsPageModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('../todos/todos.module').then( m => m.TodosPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
