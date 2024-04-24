import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { ProfilesComponent } from 'src/app/pages/profiles/profiles.component';
import { AlbumsComponent } from 'src/app/pages/albums/albums.component';
import { PhotosComponent } from 'src/app/pages/photos/photos.component';
import { PostsComponent } from 'src/app/pages/posts/posts.component';
import { AlbumsDashboardComponent } from 'src/app/pages/albums-dashboard/albums-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/:id',
        component: ProfilesComponent      
      },
      {
        path: 'albums',
        component: AlbumsDashboardComponent
      },
      {
        path: 'albums/:id',
        component: AlbumsComponent
      },
      {
        path: 'photos/:id',
        component: PhotosComponent
      },
      {
        path: 'posts/:id',
        component: PostsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
