#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var phantom = require('phantom');
var slug = require('slug');
var path = require('path');

program
  .version('0.0.1')
  .option('-t, --timeout [timeout]', 'Set the time to wait until the screenshot is taken. Default is 2 seconds')
  .parse(process.argv);


var timeout = program.timeout ? program.timeout : 0.5;

function takeScreenshot(url, timeout) {

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
