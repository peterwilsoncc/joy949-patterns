## Joy 94.9 Pattern Lab
This a pattern library for the re-development of the [Joy 94.9 website](http://joy.org.au/).

### Background
The aim is to improve the performance of the site without affecting the design. [Peter Wilson](@peterwilsoncc) presented a talk at WordCamp Brisbane on high performance sites. 

https://twitter.com/pwcc/status/604800272276328448

[Avi Miller](@Djelibeybi) respondend.

https://twitter.com/Djelibeybi/status/604822123840798720

Long story short: I took up the challenge.

## Getting started

### Requirements
* Git
* PHP
* PHP CLI

### For development

1. Clone this repository `git clone git@github.com:peterwilsoncc/joy949-patterns.git`
1. Change to the repository directory `cd joy949-patterns`
1. Install NPM dependancies
  1. Install node from https://nodejs.org
  1. Install grunt globally `npm install -g grunt-cli`
  1. Install pattern library dependancies `npm install`
1. To build the pattern library run `grunt build`
1. The html will be available in the `public` directory
1. The source will be available in the `source` directory
 
For viewing the library, you should open the HTML files in the `public` directory. If you have a web server pointing the the pattern library you should point it to these files.

Development happens in the source directory. View the resources below for details, the pattern lab documentation is very helpful.
 
### For viewing 

1. Clone this repository `git clone git@github.com:peterwilsoncc/joy949-patterns.git`
1. Change to the repository directory `cd joy949-patterns`
1. Build the patterns `php core/builder.php -g`
1. The patterns will be available in the `public` directory

## Resources
- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)

The PHP version of Pattern Lab is, at its core, a static site generator. It combines platform-agnostic assets, like the [Mustache](http://mustache.github.io/)-based patterns and the JavaScript-based viewer, with a PHP-based "builder" that transforms and dynamically builds the Pattern Lab site. By making it a static site generator, Pattern Lab strongly separates patterns, data, and presentation from build logic. 
