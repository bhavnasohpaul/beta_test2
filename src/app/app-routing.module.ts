import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user-validate', pathMatch: 'full' },
  { path: 'user-validate', loadChildren: './user-validate/user-validate.module#UserValidatePageModule' },
  { path: 'user-authentication', loadChildren: './user-authentication/user-authentication.module#UserAuthenticationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
