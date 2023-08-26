import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { ViaggiComponent } from './viaggi/viaggi.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {component: HomeComponent, path:'home'},
  {component: TableComponent, path:'anteprima/:id'},
  {component: EditComponent, path:'modifica/:id'},
  {component:CreateComponent,path:'aggiungi'},
  {component: LoginComponent, path:'login'},
  {component: UsersComponent, path:'users'},
  {component: CreateUserComponent, path:'create-user'},
  {component:ViaggiComponent, path:'viaggi'},
  {component:ViaggiComponent, path:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
