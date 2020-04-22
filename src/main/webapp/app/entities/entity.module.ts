import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-account',
        loadChildren: () => import('./user-account/user-account.module').then(m => m.GlCoopcycleUserAccountModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.GlCoopcycleRoleModule)
      },
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.GlCoopcycleCooperativeModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.GlCoopcycleRestaurantModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.GlCoopcycleProductModule)
      },
      {
        path: 'deliverer',
        loadChildren: () => import('./deliverer/deliverer.module').then(m => m.GlCoopcycleDelivererModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.GlCoopcyclePaymentModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.GlCoopcycleCartModule)
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.GlCoopcycleCourseModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GlCoopcycleEntityModule {}
