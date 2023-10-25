import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserRidesComponent } from './components/user-rides/user-rides.component';
import { BookrideComponent } from './components/bookride/bookride.component';
import { OfferrideComponent } from './components/offerride/offerride.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rides', component: UserRidesComponent  },
  { path: 'bookride', component: BookrideComponent  },
  { path: 'offerride', component: OfferrideComponent  },
  { path: '**', redirectTo: 'signup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
