# How to make your Angular 4 app SEO friendly
Single Page Applications are awesome! They load fast and give you a lot of control on how you want your application to run. They are parsed by the browser and thus you have control of the DOM elements and all of that goodness. However, by default, SPA's are not SEO friendly because of the amount of JavaScript content required to load pages.

For Instance, Angular 4 applications load the first bare HTML content before pulling the HTML content for the page being loaded using XMLHttpRequest. For search bots crawling the website that do not have the ability to parse JavaScript, this would be an issue because they will only see the first bare content every time.

Although [Google says](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html) their bots are now capable of rendering JavaScript, it is still a vague area and erring on the side of caution would be a better way to go in this matter. Also, there are other search engines that do not handle JavaScript. This article will cover how to make your Angular 4 application SEO friendly and thus easier to consume by search engines bots.


> ⚠️ This is not an Angular 4 tutorial and we will not be covering specifics on the Angular 4 framework. We will simply be showing you how to use server side rendering to serve a fully generated HTML page.


## Getting started with making our Angular 4 app SEO friendly

Before we get started on the tutorial, let us build a simple application that we will be using to test our implementation. The application will be a page that lists a bunch of topics on the homepage. We will not be connecting to any data source but instead, we will be hardcoding the data into the component.


## Setting up our Angular 4 test application

To set up our Angular 4 application, we are using [ng-cli](https://github.com/angular/angular-cli), and we will be setting up a new application called **Blogist**. To set up we will use `ng new Blogist` to create the Angular 4 application. Next we will just create a component where we can then add the logic of our code to.
Run `ng g component ./blog/posts` to generate a new posts component in the blog directory. 

Open the `./app/blog/posts.component.ts` file, we will add some logic to the code to make sure it works as we want it to. First, lets hardcode some data to the file. Add a new method called `postsData` to the component.


    private postsData() {
        return [{"title":"Making Angular.js realtime with Websockets by marble","pubDate":"2017-08-23 14:41:52","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10372","guid":"http://blog.pusher.com/?p=682#comment-10372","author":"marble","thumbnail":"","description":"always a big fan of linking to bloggers that I enjoy but dont get a great deal of link enjoy from","content":"<p>always a big fan of linking to bloggers that I enjoy but dont get a great deal of link enjoy from</p>","enclosure":[],"categories":[]},{"title":"Making Angular.js realtime with Websockets by strapless strap on","pubDate":"2017-08-23 05:05:08","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10371","guid":"http://blog.pusher.com/?p=682#comment-10371","author":"strapless strap on","thumbnail":"","description":"very couple of internet websites that transpire to be detailed beneath, from our point of view are undoubtedly properly worth checking out","content":"<p>very couple of internet websites that transpire to be detailed beneath, from our point of view are undoubtedly properly worth checking out</p>","enclosure":[],"categories":[]},{"title":"Making Angular.js realtime with Websockets by bondage restraints","pubDate":"2017-08-22 17:09:17","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10370","guid":"http://blog.pusher.com/?p=682#comment-10370","author":"bondage restraints","thumbnail":"","description":"very couple of web sites that occur to be in depth below, from our point of view are undoubtedly properly worth checking out","content":"<p>very couple of web sites that occur to be in depth below, from our point of view are undoubtedly properly worth checking out</p>","enclosure":[],"categories":[]}];
    }

Finally, replace your `constructor` method with the code below:


    public posts
    
    constructor() {
        this.posts = this.postsData()
    }

In the code above we have simply assigned the `posts` property to the `postsData`  return value, which is our simulated API call response. So, now that we have our posts data. Open your view `./app/blog/posts.component.html` and enter the code below:


    <div class="jumbotron">
        <h1>Blogist</h1>
        <p>This is the best resource for the best web development posts.</p>
    </div>
    <div class="row">
        <div class="col-xs-12 col-md-12">
            <ul class="list-group">
                <li class="list-group-item" *ngFor="let post of posts">
                    <h4>{{post.title}}</h4>
                </li>
            </ul>
        </div>
    </div>

The code above just takes the `posts` data and loops through it; each time displaying the title of the post. 

Also, open the `index.html` file and in the `<head>` , add the Bootstrap StyleSheet or just replace the contents with the following code that inserts Bootstrap CSS and adds a dummy navigation bar:


    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Blogist</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    </head>
    <body>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Blogist</a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Posts</a></li>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Graphic Design</a></li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <app-root>Loading...</app-root>
      </div>
    </body>
    </html>

The final piece of the application will be registering the Post comonent. We can do this in the `./app/app.module.ts`  file. Open the file and import the `PostsComponent`:


    import { PostsComponent } from './blog/posts.component';

Then in the `NgModule` declarations array, add the `PostsComponent` to the list:


    @NgModule({
      declarations: [
        ...
        PostsComponent,
      ],
      ...
    })

 Now when you run `ng serve` and go to the URL provided to you after the application is done building, you should be able to see the page with our posts:
 

![How to make your Angular 4 app SEO friendly](https://dl.dropbox.com/s/b1g3uga1mercokb/make-angular-4-app-seo-friendly-1.png)


Great, that is exactly what we expected. However, when you view the URL’s source, you will notice that the entire body of the page is missing and just the `<app-root>loading…</app-root>` message is visible.

![How to make your Angular 4 app SEO friendly](https://dl.dropbox.com/s/jduf7lbrewpib9i/make-angular-4-app-seo-friendly-2.png)


This is because of the way Angular works. It would load the parent template first, then after that load, it will then start the DOM manipulation processes that will insert the content of each subsequent page in the `<app-root>` tag.

Hence, when the search engine bot requests this page, it gets the HTML above and the content of the page which should have contributed to SEO is now unknown to the engine.


## Making the Angular 4 application SEO friendly

Now that we have built the sample application, we can see that right off the bat, it is is not SEO friendly. So we will be using the Angular universal platform server to prerender the templates serverside and serve that when the page is loaded.


> 💡 The Angular Universal project consists of the base platform API and the surrounding tools that enables developer to do server side rendering(or pre-rendering) of Angular applications.

To start, we will be installing the `angular/platform-server` package and the `angular/animations` package. Both are required for the platform server to function correctly. The platfprm server will be the one to provide the server-side rendering.


    $ npm install --save @angular/platform-server @angular/animations

Once the packages have been installed successfully using NPM, open the `./src/app.modules.ts` and make the following modification to the `BrowserModule` declaration:


    @NgModule({
      ...
      imports: [
        BrowserModule.withServerTransition({appId: 'blogist'})
      ],
      ...
    })

In the above code, we added the `withServerTransition` method to the `BrowserModule` and in there we passed the `appId` that is equal to the name of the application **blogist**. This addition ‘configures a browser-based application to transition from a server-rendered app, if one is present on the page’.

The next thing we will do is create a an application server module. Create a new file `./src/app/app-server.module.ts`


    import { NgModule } from '@angular/core';
    import { AppModule } from './app.module';
    import { AppComponent } from './app.component';
    import { ServerModule } from '@angular/platform-server';
    
    @NgModule({
      imports: [
        ServerModule,
        AppModule,
      ],
      bootstrap: [
        AppComponent
      ]
    })
    export class AppServerModule { }

This is a basic Angular module that will serve as our server module. The biggest thing to note in the above is that we import our `AppModule` into the server module so it will now be a part of the `AppServerModule`. This module will be where we will bootstrap our application from the server.

Now let’s create an Express server. Create a new file in `./src/server.ts` and then add the contents below:


    import 'reflect-metadata';
    import 'zone.js/dist/zone-node';
    import { renderModuleFactory } from '@angular/platform-server'
    import { enableProdMode } from '@angular/core'
    import * as express from 'express';
    import { join } from 'path';
    import { readFileSync } from 'fs';
    import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app-server.module.ngfactory'
    
    enableProdMode()
    
    const PORT     = process.env.PORT || 4000
    const DIST_DIR = join(__dirname, '..', 'dist')
    const app = express();
    const template = readFileSync(join(DIST_DIR, 'index.html')).toString()
    
    app.engine('html', (_, options, callback) => {
      let newOptions = { document: template, url: options.req.url };
      
      renderModuleFactory(AppServerModuleNgFactory, newOptions)
        .then(html => callback(null, html))
    })
    
    app.set('views', 'src')
    app.set('view engine', 'html')
    
    app.get('*.*', express.static(DIST_DIR))
    app.get('*', (req, res) => {
      res.render('index', { req })
    })
    
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}!`)
    })

In this file, we have imported all the packages we need to run our Express server. Particularly, we import `AppServerModuleNgFactory`, a file that does not yet exist (thus the squiggly error line, if you are using VSCode) but will be generated during our build process.

Next, we `enableProdMode()` which simply enables production mode on our application. Another thing of note done in this script is setting up a view engine. We use `[renderModuleFactory](https://angular.io/api/platform-server/renderModuleFactory)` to parse the HTML and render the page that was being loaded server-side. Every other thing on the code above has to do specifically with Express.

The next thing we want to do now is open our `./src/tsconfig.app.json`  file and add `server.ts` to the `exclude` section of the file. 


      "exclude": [
        "server.ts",
        ...
      ]


> 💡 The `exclude` property specifies a list of files to be excluded from compilation.

Also open the `./tsconfig.json`  file and add the snippet below to the `./tsconfig.json` file in the root of the project right below the `compilerOptions` property:


        ...
        "lib": [
          "es2016",
          "dom"
        ]
      },
      "angularCompilerOptions": {
          "genDir": "./dist/ngfactory",
          "entryModule": "./src/app/app.module#AppModule"
      }
    }


> 💡  The `genDir` is where everythin generated will mostly go. The `entryModule` accepts the path of our main bootstrapped module. The `#AppModule` at the end of the path is the name of the exported class.

The final step to take is updating the `scripts` property on our `./package.json` file. You should either replace or append this to the keys already in the `scripts` property:


    {
      ...
      "scripts": {
        "prestart": "ng build --prod && ./node_modules/.bin/ngc",
        "start": "ts-node src/server.ts"
      },
      ...
    }

We have commands registered to the `start` and `prestart` scripts on the `./package.json` file. Because we added a *pre* to the name *start*, it will run automatically before the *start* script is called.


## Testing our SEO friendly Angular 4 application

Once you have finished making these changes to the application, go to the terminal and run the following command:


    $ npm run start

This will run the `prestart` script which contains the commands `ng build --prod && ./node_modules/.bin/ngc` and then run the script *start* which contains the command `ts-node src/server.ts`. Once the commands are completed, you should see an output close to this on your terminal:


![How to make your Angular 4 app SEO friendly](https://dl.dropbox.com/s/09dcv3ndvjsoen2/make-angular-4-app-seo-friendly-4.png)


So now, when you visit the page, you should still see the same output as you saw before, but now, when you visit the page and view the source, you should see the fully rendered HTML. This would be how the search engine bots will see the page.


![How to make your Angular 4 app SEO friendly](https://dl.dropbox.com/s/aylgn7wfokg7tnl/make-angular-4-app-seo-friendly-3.png)

## Conclusion

In this article we have explored how to make your Angular 4 Single Page Application (SPA) SEO friendly by using Angular 4 Universal. Hopefully you have learnt a thing or two and the fear of bad SEO optimisation will not stop you from using Angular 4 for your applications anymore.

The source code to this application can be found on GitHub. Star and leave feedback, issues or comments. If you also have any questions, feel free to leave them below.

