# Nebula CSS ![Travis-ci](https://travis-ci.org/rbrtsmith/nebula-css.svg?branch=master) [![npm version](https://badge.fury.io/js/nebula-css.svg)](https://badge.fury.io/js/nebula-css)

* 7kb (gzip) with default settings.
* [View the demo](http://rbrtsmith.com/nebula-css/demo/)

Super low-level mobile-first Sass framework using the [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) architecture and the [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention.

Ships with zero cosmetic styling.  This allows every consuming project to have a completely bespoke UI with Nebula CSS doing the heavy lifting when it comes to layout and architecture.  This means it is totally upto you how you structure your colours, typography and cosmetic components, however you are encouraged to follow the ITCSS structure and BEMIT naming conventions.

At the core sits a highly flexible and and extendible grid system making use of the very powerful [map](https://www.viget.com/articles/sass-maps-are-awesome) feature of Sass.
Maps are used extensively and allow the following features to be easily extended and in some cases composed:
* Breakpoints
* Grid fractions
* Grid offsets
* Grid guttering
* List spacing
* Section spacing
* Spacing - margin & padding utilities

Nebula CSS also ships with some common yet useful abstractions such as the Flag Object, list variations and an array of useful utilities.

##Table of contents

* [Intro to ITCSS](#intro-to-itcss)
* [Dependencies](#dependencies)
* [Get started](#get-started)
* [Default settings and config](#default-settings-and-config)
  * [Overriding settings](#overriding-settings)
* [Breakpoints](#breakpoints)
* [Grid](#grid)
* [Flag](#flag)
* [Site-wrap](#site-wrap)
* [Lists](#lists)
  * [Bare list](#bare-list)
  * [Inline list](#inline-list)
  * [Matrix list](#matrix-list)
* [Utilities](#utilities)
  * [Push](#push)
  * [Flush](#flush)
  * [Soft](#soft)
  * [Hard](#hard)
  * [Hidden](#hidden)


##Intro to ITCSS
Nebula CSS is built upon the [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) architecture popularised by [Harry
Roberts](http://csswizardry.com/).

ITCSS stands for *Inverted Triangle* architecture for *CSS*

It is a sane, scalable, managed architecture and is more of a school of thought than a framework.

The architecture is based on the *write CSS in specificity order* principle.  This eliminates many of the specificity issues that occur as a project scales.

ITCSS is divided up into 7 distinct sections they are:

1. Settings
2. Tools
3. Resets
4. Base
5. Objects
6. Components
7. Utilities

###1. Settings
Global variables and config.

###2. Tools
Globally used mixins and functions.

###3. Resets (Generic)
[Normalize.css](https://github.com/necolas/normalize.css/) and any additional
resets on top of Normalize.

###4. Base
Global baseline styles using element and attribute selectors only (No classes)

###5. Objects
Cosmetic-free design patters, things like the grid, lists and the flag
object.  Think of it like the skeleton of the layout, with no visual styling
applied.

###6. Components
Designed components, chunks of UI.  Think of it like the skin on top of the
skeleton, so anything with colours, borders, backgrounds etc.  If in doubt
whether some CSS/Sass code belongs in layout or components then put it within
components. **Being cosmetic free Nebula CSS does not ship with any components**

###7. Utilities
Helpers and overrides. AKA Trumps.



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

Some of the settings here make use of [Sass maps](https://www.viget.com/articles/sass-maps-are-awesome) it's recommended you have at least a basic understanding of how they work.

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

###Overriding settings
When you install this framework it will live in your `node_modules` directory and you won't want to go in there and change anything as any subsequent `npm install`s will potentially overwrite those changes.
Thankfully Nebula CSS settings all have the `!default` flag attached which means they can be overridden:
```Sass
/*_settings.scss*/
@import 'nebula-css/settings';
@import 'settings/my-overrides';
```

```Sass
/*/settings/_my-overrides.scss*/
$nb-breakpoints(
  sm: 800px,
  md: 900px,
  lg: 1000px,
  xl: 1100px
);
```
The above code will override the default `$nb-breakpoints` map with your own.

## Breakpoints
The breakpoints map shown above (`$nb-breakpoints`) contains all of the breakpoints used in Nebula, you can add remove and edit the breakpoints in the map.  Nebula CSS features such as the lists, section, grid gutters, grid widths, push, flush, hard and soft utilities are all auto generate the CSS based on `$nb-breakpoints`.  The keys used in the map correlate directly to classnames generated.  For example:
```Sass
$nb-breakpoints: (
    sm: 400px,
    md: 800px,
    myKey: 1000px
);
```
and assuming we had the following declared:
```sass
$nb-list-spacing: (
  md: $nb-spacing-unit
  ) !default;
  ```
Will generate the following CSS classnames in our Bare list (Amongst the other objects)
```Sass
.o-bare-list {}
.o-bare-list--spaced-md {}
.o-bare-list--spaced-md\@sm {}
.o-bare-list--spaced-md\@md {}
.o-bare-list--spaced-md\@myKey {}
```
If our List spacing increased to:
```sass
$nb-list-spacing: (
  md: $nb-spacing-unit,
  lg: ($nb-spacing-unit * 2)
) !default;
```
The following CSS classnames would be generated:
```Sass
.o-bare-list {}
.o-bare-list--spaced-md {}
.o-bare-list--spaced-md\@sm {}
.o-bare-list--spaced-md\@md {}
.o-bare-list--spaced-md\@myKey {}
.o-bare-list--spaced-lg {}
.o-bare-list--spaced-lg\@sm {}
.o-bare-list--spaced-lg\@md {}
.o-bare-list--spaced-lg\@myKey {}
```

As we can see in these examples the `@` symbol denotes that this class applies to a particular breakpoint, the chars after should map directly to a key in `$nb-breakpoints`.  
Also note that the `@` symbol here is escaped, this is because symbols like `@` are not strictly valid CSS selectors so they must be escaped.  However you don't need to do this when defining your classnames in your HTML.

Nebula CSS also provides you with a mixin that can be use to interface with the defined breakpoints: `nb-respond-to()`  This mixin accepts a string argument.  The string should match one of the maps in `nb-breakpoints`.  e.g.
```sass
.o-my-obj {
  @include nb-respond-to('md') {
    // my CSS
  }
}
```
Being mobile first the above CSS will respond to viewports larger than the `md` breakpoint (min-width media query).  It is possible to pass in a prefix as part of the sring to denote a max-width breakpoint:
```sass
.o-my-obj {
  @include nb-respond-to('max-md') {
    // my CSS
  }
}
```
The above CSS responding to viewports smaller than the `md` breakpoint.

`nb-respond-to` also accepts an optional second argument if you wish to create a second breakpoints map that you don't wish the grid, and other utilities to map over - something more component specific.  By default this parameter points to `$nb-breakpoints`.

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

By default the grid comes with the following sets of fractions:
* One whole
* Halves
* Thirds
* Fourths
* Fifths
* Sixths
* Eighths
* Tenths
* Twelfths

As defined in the `$nb-offset-fractions` map.  You can add or remove fractions on the map to suit your project requirements.  The fractions map directly to the breakpoints.

By default Nebula CSS provides three gutter width variations from the `nb-grid-gutter-sizes` map, again these can be removed, adjusted or added to.

With a seemingly endless number of combinations available this makes Nebula CSS's grid one of the most flexible available.

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

* Matrix (Vertical guttering that matches horizontal) [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-matrix)

    ```html
    <div class="o-grid o-grid--gutter-sm o-grid--matrix" />
    ```
* Equal height items [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-equal-height)

    ```html
    <div class="o-grid o-grid--equal-height" />
    ```
* Reverse item order [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-reverse)

    ```html
    <div class="o-grid o-grid--reverse" />
    ```
* Vertically centered items [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-vertically-centered)

    ```html
    <div class="o-grid o-grid--center" />
    ```
* Bottom aligned items [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-bottom-aligned)

    ```html
    <div class="o-grid o-grid--bottom" />
  ```
* Horizontally centered items [Demo](http://rbrtsmith.com/nebula-css/demo/#grid-horizontally-aligned)

    ```html
    <div class="o-grid u-text-center" />
    ```

## Flag

[Demo](http://rbrtsmith.com/nebula-css/demo/#flag)

One of most underrated CSS abstractions originally thought up by [Harry Roberts](https://twitter.com/csswizardry) is the flag object.  It allows you to mix up fixed width components with fluid ones, is infinitely composable can be nested inside of the grid, or a grid nested inside of the fluid component it's incredibly versatile.  Oh and it also allows you to vertically align the contents to boot.

```html
<div class="o-flag">
  <div class="o-flag__component">
    <img src="my-amazing-dog.jpg" alt="">
  </div>
  <div class="o-flag__body">
    Checkout my amazing dog!
  </div>
</div>
```

## Site-wrap
A simple max-width centered container to wrap your content. You can see it applied throughout the demo page. The `--padding` modifier adds horizontal padding to the container.

```html
<div class="o-site-wrap o-site-wrap--padding">
  Main content.
</div>
```

## Lists

Nebula CSS comes with three types of list: Bare-list, Inline-list and Matrix-list.

### Bare-list
Strips a list of all default list styling. [Demo](http://rbrtsmith.com/nebula-css/demo/#bare-list)
```html
<ul class="o-bare-list">
  <li>item</li>
  <li>item</li>
</ul>
```
Spaced [Demo](http://rbrtsmith.com/nebula-css/demo/#bare-list-spaced)
```html
<ul class="o-bare-list o-bare-list--spaced-md">
  <li class="o-bare-list__item">item</li>
  <li class="o-bare-list__item">item</li>
</ul>
```

Spaced by breakpoint [Demo](http://rbrtsmith.com/nebula-css/demo/#bare-list-spaced-by-breakpoint)
```html
<ul class="o-bare-list o-bare-list--spaced-md@sm">
  <li class="o-bare-list__item">item</li>
  <li class="o-bare-list__item">item</li>
</ul>
```

## Inline list
Exactly like the bare list but the items are rendered horizontally. [Demo](http://rbrtsmith.com/nebula-css/demo/#inline-list)
```html
<ul class="o-inline-list">
  <li>item</li>
  <li>item</li>
</ul>
```
Spaced [Demo](http://rbrtsmith.com/nebula-css/demo/#inline-list-spaced)
```html
<ul class="o-inline-list o-inline-list--spaced-md">
  <li class="o-inline-list__item">item</li>
  <li class="o-inline-list__item">item</li>
</ul>
```

Spaced by breakpoint [Demo](http://rbrtsmith.com/nebula-css/demo/#inline-list-spaced-by-breakpoint)
```html
<ul class="o-inline-list o-inline-list--spaced-md@sm">
  <li class="o-inline-list__item">item</li>
  <li class="o-inline-list__item">item</li>
</ul>
```

## Matrix list
Exactly like the inline list but the items vertical spacing matches the horizontal.

Spaced
```html
<ul class="o-matrix-list o-matrix-list--spaced-md">
  <li class="o-matrix-list__item">item</li>
  <li class="o-matrix-list__item">item</li>
</ul>
```

Spaced by breakpoint [Demo](http://rbrtsmith.com/nebula-css/demo/#matrix-list)
```html
<ul class="o-matrix-list o-matrix-list--spaced-md@sm">
  <li class="o-matrix-list__item">item</li>
  <li class="o-matrix-list__item">item</li>
</ul>
```
##utilities

Form the Utilities Layer in ITCSS, each a single responsibility class.  They are intended to be used as overrides.

### Push

Adds margins, Nebula CSS encourages [single direction margin declarations](http://csswizardry.com/2012/06/single-direction-margin-declarations/) to eliminate confusion around collapsing borders

```html
<div class="u-push-left-md"></div>
<div class="u-push-bottom-md"></div>
<div class="u-push-left-md@sm"></div>
```

### Flush
Removes margins
```html
<div class="u-push-top-md"></div>
<div class="u-push-right-md"></div>
<div class="u-push-bottom-md"></div>
<div class="u-push-left-md"></div>
<div class="u-push-left-md@lg"></div>
```

### Soft
Adds padding
```html
<div class="u-soft-md"></div>
<div class="u-soft-top-md"></div>
<div class="u-soft-right-md"></div>
<div class="u-soft-bottom-md"></div>
<div class="u-soft-left-md"></div>
<div class="u-soft-left-md@lg"></div>
```

### Hard
Removes padding
```html
<div class="u-hard"></div>
<div class="u-hard-top"></div>
<div class="u-hard-right"></div>
<div class="u-hard-bottom"></div>
<div class="u-hard-left"></div>
<div class="u-hard-left@lg"></div>
```

### Text-align
Adds text-alignment.
```html
<div class="u-text-left"></div>
<div class="u-text-center"></div>
<div class="u-text-right"></div>
```

### Hidden

Hides elements, or visually hides (Still accessible.)
```html
<div class="u-hidden"></div>
<div class="u-visually-hidden"></div>
```
