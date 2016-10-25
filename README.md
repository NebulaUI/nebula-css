# Nebula CSS ![Travis-ci](https://travis-ci.org/rbrtsmith/nebula-css.svg?branch=master) [![npm version](https://badge.fury.io/js/nebula-css.svg)](https://badge.fury.io/js/nebula-css)

* 6kb (gzip) with default settings.
* [View the demo](http://rbrtsmith.com/nebula-css/demo/)

Super low-level Sass framework using the [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) architecture and the [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention.

Ships with 100% zero cosmetic styling.  This allows every project built with Nebula CSS to have a completely bespoke look and feel with Nebula CSS doing the heavy lifting when it comes to layout and architecture.

At the core sits a highly flexible and and extendible grid system making use of the very powerful [map](https://www.viget.com/articles/sass-maps-are-awesome) feature of Sass.
Maps are used extensively and allow the following features to be easily extended and in some cases composed:
* Breakpoints
* Grid fractions
* Grid guttering
* List spacing
* Section spacing
* Spacing - margin & padding utilities

Also ships with some common and useful abstractions such as the Flag Object.

##Table of contents

* [Dependencies](#dependencies)
* [Get started](#get-started)

##dependencies

Nebula CSS is composed of [Sass](http://sass-lang.com/) files so you'll need some way to compile to CSS.  We'd We'd recommend to use a [Libsass](http://sass-lang.com/libsass) based tool, which will likely be available for your build tool of choice:
* [Node Sass](https://github.com/sass/node-sass) (NPM Scripts)
* [Webpack Sass Loader](https://github.com/jtangelder/sass-loader) (Webpack)
* [Gulp Sass](https://github.com/dlmanning/gulp-sass) (Gulp)

Having a deep knowledge of Sass is not required to consume Nebula CSS, but a familiarity will greatly help you get the most out of this architecture.

**This document assumes you have [NodeJS](https://nodejs.org/en/) installed on your machine.**

Nebula's source code does not include any vendor prefixes.  This gives you the freedom to configure [Autoprefixer](https://github.com/postcss/autoprefixer) to the browsers that you intend to support.  
This can be ran directly in NPM scripts as you can see happening in this projects [package.json](https://github.com/rbrtsmith/nebula-css/blob/master/package.json#L9).  Alternatively you can run this in your build-tool of choice.


##Get Started
1. `npm install --save nebula-css`
2. Setup an ITCSS file structure:
  1. `cd` into the directory where you intend to build out your ITCSS structure.
  2. Paste the following snippet into your terminal:  
  *&mdash; Windows users will have to manually create and populate the files.*

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
  The following file structure will be created.

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
  `main.scss` gets populated with the seven ITCSS layers.

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
  The files that `main.scss` imports are also populated with `@import` statements
  that are pulling in the corresponding ITCSS layer from Nebula CSS. E.g.

    ```scss
    /*  _settings.scss */
    @import 'nebula-css/settings';
    ```
    It is worth noting here that to resolve the above path your Sass compiler requires
    [Node-sass IncludePaths](https://github.com/sass/node-sass#includepaths)
    If your Sass Compiler does not offer IncludePaths resulting in your build failing
    you will have to give your imports a relative path:
    ```scss
    /*  _settings.scss */
    @import '[path-to-node-modules]/nebula-css/nebula-css/settings';
    ```
    As you can see this is rather verbose and ugly code but it works!

    Below is an example of an NPM script configured to compile Sass and making use of `includePaths` pointing to the directory to be resolved `./node-modules/nebula-css/`

    ```json
    "scripts": {
      "sass": "node-sass --include-path ./node_modules/nebula-css/ -o dist src/scss/main.scss",
    },
    ```
    See how the NPM scripts [package.json](https://github.com/rbrtsmith/nebula-css/blob/master/package.json#L8) are configured for the Nebula CSS Demo.

    Alternatively here's an example using Gulp.

    ```JavaScript
      gulp.task('build:css', () => {
        const includePaths = ['./node_modules/nebula-css/'];
        return gulp.src('src/scss/**/*.scss')
          .pipe(sass({ includePaths }))
          .pipe(gulp.dest('dist'))
      });
    ```
3.


4. You can now start extending Nebula with your own styling.  Following with the ITCSS structure it's recommended that you create the folders for the layers that you are extending and `@import` those files.

... More documentation coming very soon!
