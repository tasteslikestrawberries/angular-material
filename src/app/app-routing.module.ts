import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ParentComponent } from './components/playground/parent/parent.component';
import { ChildComponent } from './components/playground/child/child.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'form', component: FormComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'child', component: ChildComponent },
  { path: 'list', component: ListComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
