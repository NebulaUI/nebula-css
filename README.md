# rwsmith-grid
Probably the most feature packed and powerful responsive grid system you've 
ever come across&hellip;

**Features**
* Fluid
* Infinitely nestable
* Based on fractions rather than columns yielding increased flexibility over
  traditional approach using 12 columns.
* Intuitive classnames based on a BEM methodology hybrid known as [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/#responsive-suffixes)
* Optional equal height grid items based on flexbox (IE10+)
* Optional vertical alignment of grid items (when heights differ).
* Large, standard, small or zero gutters&mdash;all of which are cusomisable.
* Optional vertical gutters&mdash;which match the width of horizontal gutters.
* No clearfixing required, rows of items with uneven heights tile gracefully.
* Does not require a wrapping element like most other grid systems.
* Extremely lightweight, using Sass @if blocks you can include only the
  features that you require via the `Feature-toggle` list.
* Width, push and pull classes are not tied directly to the grid, and can be 
  reused anywhere in your project.
* Ability to reverse the order of grid-items.
* Ability to use any number of user-defined breakpoints with user defined
  namespaces to match.

##Setup

**Vars**
* `$grid-gutter-width` set the width of the guttering.
* `$gutter-lg-width` width of large gutters
* `$gutter-sm-width` width of small gutters
* `$grid-font-size` Due to using inline-blocks on the `.grid__item`s we have to
 set the font-size on the `.grid` block to zero to remove unwanted whitespace,
 which would otherwise cause the grid to fail.  This font-size value will be
 set on each individual item and should equal the base font size of your project.
* `$grid-breakpoints` is a nested Sass list that contains all the grid's 
breakpoints that will be used on any toggled width, push or pull classe. You
can set additional or remove breakpoints, alter their values and the namespace.

##Acknowledgments
This grid system is Heavily influenced by the great work of
[@csswizardry](https://twitter.com/csswizardry])'s own grid system 
[csswizardry-grids](https://github.com/csswizardry/csswizardry-grids).  

If you haven't already had the privilege of reading Harry's blog then I really 
urge you to dive right in.  It's quite literally a goldmine of useful 
information and techniques.
[http://csswizardry.com](http://csswizardry.com)




