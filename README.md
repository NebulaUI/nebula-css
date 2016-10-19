# Nebula-css


[View the demo](http://rbrtsmith.com/nebula-css/demo/)


##Get Started
1. Ensure you have [NodeJS](https://nodejs.org/en/) installed on your machine and have setup your `package.json`
2. `npm i -S nebula-css`
3. Setup an ITCSS file structure:
  1. `cd` into your source directory
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
    touch _settings.scss _tools.scss _resets.scss _base.scss _objects.scss _components.scss _utilities.scss
    cd ..
    ```
  It will create the file structure illustrated below

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
  and will also populate `main.scss` with the imports below.
  
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
