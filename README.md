dojoCMIS
========

A Dojo store to access CMIS based services

See http://tech.wrighting.org/2014/06/17/a-dojo-store-for-the-cmis-browser-binding

example.html gives a simple, imperfect and incomplete, example of using the store

The dojotoolkit is expected to be found in js/lib/dojo-1.9.3 (js/Gruntfile.js, js/wrighting/tests/intern.js and the example file)

Testing

https://github.com/theintern/intern#quick-start
```
apt-get install npm
npm install intern --save-dev
apt-get install nodejs
sudo npm install -g grunt-cli
sudo ln -s `which nodejs` /usr/local/bin/node

npm install
```
This picks up the dependencies from package.json

http://www.sitepen.com/blog/2014/02/18/dojo-automated-testing-improvements-updating-to-intern/

Running tests
```
grunt test:proxy
```
To run tests look at the console in the browser at:
```
http://localhost:9001/__intern/client.html?config=src/grunt/tests/intern
```

To run from the command line - No tests at presents
```
node_modules/.bin/intern-client config=src/grunt/tests/intern
```
