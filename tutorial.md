# Making your Angular 4 application SEO friendly
Single Page Applications are awesome! They load fast and give you a lot of control on how you want your application to run. They are parsed by the browser and thus you have control of the DOM elements and all of that goodness. However, by default, SPA's are not SEO friendly because of the amount of JavaScript content required to load pages.

For Instance, Angular 4 applications load the first bare HTML content before pulling the HTML content for the page being loaded using XMLHttpRequest. For search bots crawling the website that do not have the ability to parse JavaScript, this would be an issue because they will only see the first bare content every time.

Although [Google says](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html) their bots are now capable of rendering JavaScript, it is still a vague area and erring on the side of caution would be a better way to go in this matter. Also, there are other search engines that do not handle JavaScript. This article will cover how to make your Angular 4 application SEO friendly and thus easier to consume by search engines bots.

> 💡 Gotcha: This is not an Angular 4 tutorial and we will not be covering specifics on the Angular 4 framework. We will simply be showing you how to use server side rendering to serve a fully generated HTML page.

## Getting started
Before we get started on the tutorial, let us build a simple application that we will be using to test our implementation. The application will be a page that lists a bunch of topics on the homepage. We will not be connecting to any data source but instead, we will be hardcoding the data into the component.

### Setting up our test Angular 4 application
To set up our Angular 4 application, we are using [ng-cli](#), and we will be setting up a new application called **Blogist**. To set up we will use `ng new Blogist` to create the Angular 4 application. Next we will just create a component where we can then add the logic of our code to.

Run `ng g component ./blog/posts` to generate a new posts component in the blog directory. Open the `./app/blog/posts.component.ts` file, we will add some logic to the code to make sure it works as we want it to. First, lets hardcode some data to the file.

```javascript
private postsData() {
    return [{"title":"Making Angular.js realtime with Websockets by marble","pubDate":"2017-08-23 14:41:52","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10372","guid":"http://blog.pusher.com/?p=682#comment-10372","author":"marble","thumbnail":"","description":"always a big fan of linking to bloggers that I enjoy but dont get a great deal of link enjoy from","content":"<p>always a big fan of linking to bloggers that I enjoy but dont get a great deal of link enjoy from</p>","enclosure":[],"categories":[]},{"title":"Making Angular.js realtime with Websockets by strapless strap on","pubDate":"2017-08-23 05:05:08","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10371","guid":"http://blog.pusher.com/?p=682#comment-10371","author":"strapless strap on","thumbnail":"","description":"very couple of internet websites that transpire to be detailed beneath, from our point of view are undoubtedly properly worth checking out","content":"<p>very couple of internet websites that transpire to be detailed beneath, from our point of view are undoubtedly properly worth checking out</p>","enclosure":[],"categories":[]},{"title":"Making Angular.js realtime with Websockets by bondage restraints","pubDate":"2017-08-22 17:09:17","link":"https://blog.pusher.com/making-angular-js-realtime-with-pusher/#comment-10370","guid":"http://blog.pusher.com/?p=682#comment-10370","author":"bondage restraints","thumbnail":"","description":"very couple of web sites that occur to be in depth below, from our point of view are undoubtedly properly worth checking out","content":"<p>very couple of web sites that occur to be in depth below, from our point of view are undoubtedly properly worth checking out</p>","enclosure":[],"categories":[]}];
}
```
