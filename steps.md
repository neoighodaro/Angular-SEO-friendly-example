* `npm install --save @angular/platform-server @angular/animations`
    - Server side rendering and generating HTML pages.
    - Animations is needed to avoid errors later
* Add `.withServerTransition({appId: 'blogist'})` to the BrowserModule
    - Allows universal to replace the HTML generated on its own.
* Create a server app module `app-server.module.ts`
    - Bootstrap the application from the server
* Create the express server in `./src/server.ts`
    - Highlight `import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app-server.module.ngfactory'`
    - Highlight `renderModuleFactory`
* Open the `./src/tsconfig.app.json` and exclude the `server.ts` file by adding it to the `exclude` section of the file
* Add the snippet to the `tsconfig.json` file in the root of the project
    ```
    "angularCompilerOptions": {
      "genDir": "./dist/ngfactory",
      "entryModule": "./src/app/app.module#AppModule"
    }
    ```
    - `genDir` is where the generated stuff will go.
    - `entryModule` accepts the path of our main bootstrapped module. The `#AppModule` at the end of the path is the name of the exported class.
* Update the `scripts` section in our `package.json` file. We add a `pre` in front of the `start` command to first run the `ng build --prod && ./node_modules/.bin/ngc` command. After that, it launches the server based on our `server.ts` config.

