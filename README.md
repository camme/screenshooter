screenshooter
=============

Command line tool in nodejs to take full-length screenshots of websites.


# Install

Simply install with npm

    npm install screenshooter -g

# Usage

Taking a screenshot is super simple:

    screenshooter https://www.github.com
  
This will take a screenshot of githubs page and save it to the current working directory

# Options

Currently screenshooter only accepts to parameters:

    screenshooter URL [-t]
  
- The URL is mandatory. 
- -t or --timeout is the amount of seconds it should wait until taking the screenshot

Future releases will include setting upp the resolution, saving to PDF and some other smart things.
