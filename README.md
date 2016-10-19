# Nebula CSS ![Travis-ci](https://travis-ci.org/rbrtsmith/nebula-css.svg?branch=master)

Nebula CSS is a super low-level Sass framework that is built using the [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) architecture and uses the [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention throughout.

Nebula ships with 100% zero cosmetic styling.  This allows every project built with Nebula to have a completely bespoke look and feel with Nebula doing the heavy lifting when it comes to layout and architecture.

At the core of Nebula sits a highly flexible and and extendible grid system - actually everything here is extensible including but not limited to
* Breakpoints
* Grid fractions
* Grid guttering
* list spacing
* section spacing

It also ships with a few common and useful abstractions such as the Flag Object.

Nebula is ultra lightweight with the default settings coming in at a tiny 5kb Gizpped.  This can potentially be even less if you decided to remove unwanted grid features for example.

[View the demo](http://rbrtsmith.com/nebula-css/demo/)


##Get Started
1. Ensure you have [NodeJS](https://nodejs.org/en/) installed on your machine and have setup your `package.json`
2. Install Nebula-css: `npm i -S nebula-css`
3. Setup an ITCSS file structure:
  1. `cd` into the directory where you intend to build out your ITCSS structure.
  2. Paste the following snippet into your terminal:

    ```
    mkdir scss &&
    cd scss &&
    {
      echo "@import 'settings';"
      echo "@import 'tools';"
      echo "@import 'resets';"
      echo "@import 'base';"
      echo "@import 'objects';"
      echo "@import 'components';"
      echo "@import 'utilities';"
      echo ""
    } > main.scss &&
    echo "@import 'nebula-css/settings';" > _settings.scss &&
    echo "@import 'nebula-css/tools';" > _tools.scss &&
    echo "@import 'nebula-css/resets';" > _resets.scss &&
    echo "@import 'nebula-css/base';" > _base.scss &&
    echo "@import 'nebula-css/objects';" > _objects.scss &&
    echo "@import 'nebula-css/utilities';" > _utilities.scss &&
    touch _components.scss &&
    cd ..
    ```
  It will create the file structure illustrated below.

    ```
    scss/
    |
    ├──main.scss
    ├──_settings.scss
    ├──_tools.scss
    ├──_resets.scss
    ├──_base.scss
    ├──_objects.scss
    ├──_components.scss
    ├──_utilities.scss
    ```
  It will also populate `main.scss` with the imports below.

    ```scss
    /* main.scss */
    @import 'settings';
    @import 'tools';
    @import 'resets';
    @import 'base';
    @import 'objects';
    @import 'components';
    @import 'utilities';
    ```
  And will populate the remaining files with the appropriate imports to pull in Nebula CSS fron your `node_modules` directory.

  **Note! The paths you see are not directly linking to `node_modules`, this is because IncludePaths required in your build tool to allow these paths to be resolved.  IncludePaths for both nebula an normalize are required: `./node_modules/nebula-css/`, `./node_modules/normalize-scss/sass/`**

  You can read more about IncludePaths:
   * [Node-sass IncludePaths](https://github.com/sass/node-sass#includepaths)

4. Ensure the build tool of your choice is configured to build you Sass files appropriately.  

  below you'll find an example using NPM Scripts.
  It uses [node-sass](https://github.com/sass/node-sass) and [autoprefixer](https://github.com/postcss/autoprefixer).  You can also see how the `--include-path` is set here.  You can paste this into your `package.json` and change the paths to suit those within your project.

  **Note** For this to work you will also have to install: `npm i -D node-sass autoprefixer`
  ```json
  "scripts": {
    "sass": "node-sass --output-style compressed --include-path ./node_modules/nebula-css/ --include-path ./node_modules/normalize-scss/sass/ -o dist src/scss/main.scss",
    "autoprefixer": "postcss -u autoprefixer --autoprefixer.browsers 'last 2 versions' 'ie 9-11' -r dist/main.css",
    "build": "npm run sass && npm run autoprefixer"
  },
  ```

  `npm run build` will execute the build script above and generate your compiled CSS output.

5.  You can now start extending Nebula with your own styling.  Following with the ITCSS structure it's recommended that you create the folders for the layers that you are extending and `@import` those files.

... More documentation coming very soon!
