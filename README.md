## Website Performance Optimization portfolio project

I have accepted the challenge to optimize [Cam's Pizzeria](https://mindgriot.github.io/phil-website-optimization/views/pizza.html "https://mindgriot.github.io/phil-website-optimization/views/pizza.html") online site! [Cam's Pizzeria](https://mindgriot.github.io/phil-website-optimization/views/pizza.html "https://mindgriot.github.io/phil-website-optimization/views/pizza.html") online site is hosted through my [GitHub](https://github.com/mindgriot "https://github.com/mindgriot") personal page. The critical rendering path has been improved, and now receives Google [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fmindgriot.github.io%2Fphil-website-optimization%2Fviews%2Fpizza.html&tab=mobile "PageSpeed Insights") scores of 97 and 98 for Mobile and Desktop platforms respectively, as of August 13, 2016. The browser used to develop and test the aforementioned results was [Google Chrome - Canary](https://www.google.com/chrome/browser/canary.html "https://www.google.com/chrome/browser/canary.html") Version 54.0.2828.0 canary (64-bit).

To review the files used for development, check out my [repository](https://github.com/mindgriot/phil-website-optimization "https://github.com/mindgriot/phil-website-optimization"), which is a [fork](https://github.com/udacity/frontend-nanodegree-mobile-portfolio "https://github.com/udacity/frontend-nanodegree-mobile-portfolio") from the [Udacity](https://www.udacity.com/ "https://www.udacity.com/") GitHub repo; and, inspect the code.

### Development Tools Used
1. [Atom](https://atom.io/ "https://atom.io/") version 1.9.8
2. [Google Chrome - Canary](https://www.google.com/chrome/browser/canary.html "https://www.google.com/chrome/browser/canary.html") Version 54.0.2828.0 canary (64-bit)
3. [npm](https://www.npmjs.com/ "https://www.npmjs.com/")
4. [nodejs](https://nodejs.org/en/ "https://nodejs.org/en/")
5. [gulpjs](http://gulpjs.com/ "http://gulpjs.com/")
6. [gulp plugins](http://gulpjs.com/plugins/ "http://gulpjs.com/plugins/")
7. [GitHub Desktop](https://desktop.github.com/ "https://desktop.github.com/")
8. MacBook Pro OSX 10.11.6

  * The gulpfile.js file used for pre/post processing is located in the root directory of my [repository](https://github.com/mindgriot/phil-website-optimization "https://github.com/mindgriot/phil-website-optimization"). To use the pre/post processes I used install the following gulpjs plugins:

  ```bash
  $> sudo npm install --save-dev gulp gulp gulp-minify lost axis postcss-cssnext gulp-cssnano gulp-plumber gulp-concat browser-sync autoprefixer gulp-sourcemaps gulp-responsive gulp-stylus poststylus rupture gulp-load-plugins gulp-rename gulp-imagemin
  ```
  * run the gulp command to start the server and run default gulp scripts, or run individuals scripts by themselves:

  ```bash
  $> gulp
  or
  $> gulp 'script name'
  ```


### Performance Optimization Processes
The src files of this project are located in the "views" directory at the root of my [repository](https://github.com/mindgriot/phil-website-optimization "https://github.com/mindgriot/phil-website-optimization"). The dist files are located in a directory called "dist" within the "views" directory. And pizza.html is  located at the root of the "views" directory.

The "dist" directory consists of the minified/compressed production files for the final [Cam's Pizzeria](https://mindgriot.github.io/phil-website-optimization/views/pizza.html "https://mindgriot.github.io/phil-website-optimization/views/pizza.html") online site.

1. I removed inline css styles from pizza.html to help reduce css render blocking, while also adding width and height dimensions to img tags to help the browser know the size of the element that would be placed in the img location.
2. I compressed and scaled the images of the site.
3. I compressed the js file used in the site.
4. I compressed the css file used in the site. And ran an audit within Google Chrome's developer tools to determine which css styles were not being used on the site. From this audit, I extracted the css styles the site used from the bootstrap-grid.css file and merged them into the style.css file, so the browser would not have to make two requests from two css files to render one page.
5. I refactored the function changePizzaSizes(size) located at line 425 of views/js/main.js to eliminate redundant and non-critical code (from a Cameron Pittman video/quiz).
6. I refactored the document.addEventListener('DOMContentLoaded', function() located at line 516 of views/js/main.js by reducing the number over pizzas animated from 200 to 23. All 200 pizzas were not being produced on the screen and this was producing unnecessary function calls and scripting.
7. I replace all document.queryselectorall calls with document.getElementsByClassName. And nested document.getElementsByClassName within document.getElementById, in one case, call the class calls could be more focused. This helps to reduce the time involved to update elements because only the specific classes are being queried, not the entire pizza.html document.
8. I researched and found a way to help reduce css from blocking render with the asynchronous "preload" [markup](https://github.com/filamentgroup/loadCSS/blob/master/README.md "https://github.com/filamentgroup/loadCSS/blob/master/README.md"), [example page](https://filamentgroup.github.io/loadCSS/test/preload.html "https://filamentgroup.github.io/loadCSS/test/preload.html").
