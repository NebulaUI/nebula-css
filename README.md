# Nebula CSS ![Travis-ci](https://travis-ci.org/rbrtsmith/nebula-css.svg?branch=master) [![npm version](https://badge.fury.io/js/nebula-css.svg)](https://badge.fury.io/js/nebula-css)

* 6kb (gzip) with default settings.
* [View the demo](http://rbrtsmith.com/nebula-css/demo/)

Super low-level mobile-first Sass framework using the [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) architecture and the [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention.

Ships with 100% zero cosmetic styling.  This allows every project built with Nebula CSS to have a completely bespoke look and feel with Nebula CSS doing the heavy lifting when it comes to layout and architecture.

At the core sits a highly flexible and and extendible grid system making use of the very powerful [map](https://www.viget.com/articles/sass-maps-are-awesome) feature of Sass.
Maps are used extensively and allow the following features to be easily extended and in some cases composed:
* Breakpoints
* Grid fractions
* Grid offsets
* Grid guttering
* List spacing
* Section spacing
* Spacing - margin & padding utilities

Also ships with some common and useful abstractions such as the Flag Object.

##Table of contents

* [Dependencies](#dependencies)
* [Get started](#get-started)
* [Default settings and config](#default-settings-and-config)
* [Grid](#grid)

##dependencies

Nebula CSS is composed of [Sass](http://sass-lang.com/) files so you'll need some way to compile to CSS; we'd recommend you use a [Libsass](http://sass-lang.com/libsass) based tool, which will likely be available for your build tool of choice:
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

3. Configure your build tool to build your Sass files and run Autoprefixer

4. You can now start extending Nebula with your own styling.  Following with the ITCSS structure it's recommended that you create the folders for the layers that you are extending and `@import` those files.

  An example structure might look like this:
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
  ├──settings/
  |  └──_nebula-overrides.scss
  |  └──_my-settings.scss
  ├──base/
  |  └──_my-base-styles.scss
  ├──objects
  |  ├──_my-object-1.scss
  |  └──_my-object-2.scss
  ├──components/
  |  ├──_my-component-1.scss
  |  └──_my-component-2.scss
  └──utilities/
  ├──_my-utility-1.scss
  └──_my-utility-2.scss
  ```

##Default settings and config

Defines the namespace to be added to classes generated by Nebula.
```sass
$nb-namespace: '' !default;
```
Defines the maximum width of the site wrapper `o-site-wrap`
```sass
$nb-site-wrap-width: 60rem !default;
```
The spacing unit is used throughout the entire framework for spacing and guttering. It yields consistent spacing rhythm throughout your project.
```sass
$nb-spacing-unit: 1rem !default;
```
Base font-sizing for body copy.
```sass
$nb-base-font-size: 1rem !default;
```
Breakpoints using a Sass Map. the keys `sm`, `md` are used to generate the responsive classnames.  Being a Sass map it is possible to add or remove breakpoints and of course you can change the values.
```sass
$nb-breakpoints: (
  sm: 720px,
  md: 960px,
  lg: 1200px
) !default;
```
The root font-sizing set as a percentage on the `<html>` element.  
The key `default` being the initial sizing up until the key matching the `$nb-breakpoints` key.  In this case `sm` So screens larger than 720px will get 100% root-font sizing.  Those smaller will receive 90%.
```sass
$nb-root-sizing: (
  default: 90%,
  sm: 100%
) !default;
```
List Spacing for all kinds of lists such as `inline-list`, `bare-list` `matrix-list`. The keys here are used to generate the BEM modifier classnames
so you can name then whatever you deem appropriate.  By default you are provided with a single `md` key.
```sass
$nb-list-spacing: (
  md: $nb-spacing-unit
) !default;
```
Spacing for all sections.  The Sass map here operates exactly like `$nb-list-spacing`. above.
```sass
$nb-section-spacing: (
  md: ($nb-spacing-unit * 2)
) !default;
```
The grid system uses inline-blocks.  To remove the whitespace between grid-items it's required that a font-size of zero is set on the wrapping element, then the child elements are reset using `$nb-base-font-size`.  If you are minifying your HTML or using JSX with a framework like React it is safe to turn this off.
```Sass
$nb-use-grid-zero-font-size: true !default;
```
Gutter sizes for the grid system.  By default we have three sizes, you can add or remove these to suit your projects needs.
```Sass
$nb-grid-gutter-sizes: (
  sm: ($nb-spacing-unit / 2),
  md: $nb-spacing-unit,
  lg: ($nb-spacing-unit * 2)
) !default;
```
Offsets used for the grid based in fractions whereby `1/2` will yield a width of `50%`.  This Sass map is also used for Push/Pull offsets on the grid. Being a Sass map you are free to add or remove whatever offsets are suitable for your project needs.  Note that the keys are quoted due to a fraction being used.  You can also turn off width/push/pull offsets globally saving you from bloat if any of those features are not being used.
```Sass
$nb-use-width-offsets: true !default;
$nb-use-push-offsets: true !default;
$nb-use-pull-offsets: true !default;
$nb-offset-fractions: (
  '1/1': 1/1,
  '1/2': 1/2,
  '1/3': 1/3,
  '2/3': 2/3,
  '1/4': 1/4,
  '2/4': 2/4,
  '3/4': 3/4,
  '1/5': 1/5,
  '2/5': 2/5,
  '3/5': 3/5,
  '4/5': 4/5,
  '1/6': 1/6,
  '2/6': 2/6,
  '3/6': 3/6,
  '4/6': 4/6,
  '5/6': 5/6,
  '1/8': 1/8,
  '2/8': 2/8,
  '3/8': 3/8,
  '4/8': 4/8,
  '5/8': 5/8,
  '6/8': 6/8,
  '7/8': 7/8,
  '1/10': 1/10,
  '2/10': 2/10,
  '3/10': 3/10,
  '4/10': 4/10,
  '5/10': 5/10,
  '6/10': 6/10,
  '7/10': 7/10,
  '8/10': 8/10,
  '9/10': 9/10,
  '1/12': 1/12,
  '2/12': 2/12,
  '3/12': 3/12,
  '4/12': 4/12,
  '5/12': 5/12,
  '6/12': 6/12,
  '7/12': 7/12,
  '8/12': 8/12,
  '9/12': 9/12,
  '10/12': 10/12,
  '11/12': 11/12
) !default;
```
Used for the `Push` utility to add margin to a component.
```Sass
$nb-push-sizes: (
  md: $nb-spacing-unit
) !default;
```
Used for the `Soft` utility to add padding to a component.
```Sass
$nb-soft-sizes: (
  md: $nb-spacing-unit
) !default;
```

## Grid

[Demo](http://rbrtsmith.com/nebula-css/demo/#grid)

The grid system employed in Nebula CSS uses fractions rather than columns yielding increased flexibility.  Instead of many other popular grid systems Nebula CSS uses inline-block as opposed to floats; this results in many benefits.

### Features
* Fluid
* Infinitely nestable
* Equal height grid items based on Flexbox (IE10+)
* Vertical alignment of grid items
* Vertical gutters
* Variable gutter sizing
* horizontal reversal of grid-items
* No clearfixing required, rows of items with uneven heights tile gracefully.
* Classnames based on BEMIT fractions and responsive suffixes
* Does not require a wrapping element like most other grid systems.
* Extremely lightweight using the Sass maps found in [Default settings and config](#default-settings-and-config) unused bloat can be removed.
* Width, push and pull classes are not tied directly to the grid, and can be reused anywhere in your project.

### Examples
A simple grid with two grid-items one 25% wide the other 75%.  By default the grid comes with no gutters.

```html
<div class="o-grid">
  <div class="o-grid__item u-1/4">
    25% wide
  </div>
  <div class="o-grid__item u-3/4">
    75% wide
  </div>
</div>
```

Responsive breakpoints
```html
<div class="o-grid">
  <div class="o-grid__item u-1/4@sm">
    25% wide at screens larger than the `sm` breakpoint.
  </div>
  <div class="o-grid__item u-3/4@sm">
    75% wide at screens larger than the `sm` breakpoint.
  </div>
</div>
```

Medium sized guttering
```html
<div class="o-grid o-grid--gutter-md">
  <div class="o-grid__item u-1/4">
    25% wide at screens larger than the `sm` breakpoint.
  </div>
  <div class="o-grid__item u-3/4">
    75% wide at screens larger than the `sm` breakpoint.
  </div>
</div>
```

Varying guttering depending on the breakpoint
```html
<div class="o-grid o-grid--gutter-sm@md o-grid--gutter-md@lg">
  <div class="o-grid__item u-1/4">
    25% wide
  </div>
  <div class="o-grid__item u-3/4">
    75% wide
  </div>
</div>
```

There are various BEM modifiers that you can add to the grid as shown below:

* Matrix (Vertical guttering that matches horizontal)
  ```html
  <div class="o-grid o-grid--gutter-sm o-grid--matrix" />
  ```
* Equal heights items
  ```html
  <div class="o-grid o-grid--equal-height" />
  ```
* Reverse item order
  ```html
  <div class="o-grid o-grid--reverse" />
  ```
* Vertically centered items
  ```html
  <div class="o-grid o-grid--center" />
  ```
* Bottom aligned items
  ```html
  <div class="o-grid o-grid--bottom" />
  ```
* Horizontally centered items
  ```html
  <div class="o-grid u-text-center" />
  ```
