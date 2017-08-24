import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostsComponent } from './blog/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'blogist'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
