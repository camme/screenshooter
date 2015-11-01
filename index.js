#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var phantom = require('phantom');
var slug = require('slug');
var path = require('path');

program
    .version('0.3.2')
    .usage(' [options] url')
    .option('-t, --timeout [timeout]', 'Set the time to wait until the screenshot is taken. Default is .5 seconds')

    program.on('--help', function(){
        console.log('  Example:');
        console.log('');
        console.log('    Take a screenshot of www.1001.io:');
        console.log('    $ screenshooter http://www.1000.io');
        console.log('');
        console.log('    Take a screenshot of www.1001.io but wait at least 5 seconds:');
        console.log('    $ screenshooter http://www.1000.io -t 6');
        console.log('');
    });

program.parse(process.argv);


var timeout = program.timeout ? program.timeout : 0.5;

function takeScreenshot(url, timeout) {

    if (!url) {

        console.log('');
        console.log('  How to use:');
        console.log('');
        console.log('    Take a screenshot of www.1001.io:');
        console.log('    $ screenshooter http://www.1000.io');
        console.log('');
        console.log('    Take a screenshot of www.1001.io but wait at least 5 seconds:');
        console.log('    $ screenshooter http://www.1000.io -t 6');
        console.log('');

        return;

    }

  phantom.create(function(ph) {

      ph.createPage(function(page) {

            page.setViewportSize(1024, 1000);

            console.log("Opening %s", url);

          page.open(url, function (status) {

              console.log("Waiting %s seconds...", timeout);

              setTimeout(function() {

                  var urlName = url.replace(/(https|http|:)/g, '');
                  var imageFile = path.join(process.cwd(), slug(urlName).replace(/\./g, '-') + ".png");

                  console.log("Writing screenshot to %s",imageFile);

                  page.render(imageFile, function() {

                      console.log("Image created");
                      ph.exit();

                      setTimeout(function() {

                          process.exit(0);

                      }, 1000);

                  });

              }, timeout * 1000);

          });


      });
  });

};

takeScreenshot(program.args[0], timeout);
