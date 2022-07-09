import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/components/task/task.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./task/task.module").then(m => m.TaskModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}