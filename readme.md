To use:

1. Install sportdb
2. Run `sportdb b` in `api-server` 
3. Rename `sport.db` to `football.db`
4. Run `node ./server.js` in `api-server` to start the API server
5. Run `node ./server.js` in the master directory to start the (development) web server

Run `node_modules/.bin/webpack --config webpack.prod.config.js` to generate the html template and 2 javascript bundles for production 

Run 'sportdb b' to pull new data from the openfootball repo and build an up-to-date database