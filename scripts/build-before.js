module.exports = function (ctx) {
  return new Promise(function (resolve, reject) {
    try {
      var yargs = require('yargs');
      var argv = yargs.argv;

      var environment = 'production';
      if (argv.environment === 'preview' || argv.environment === 'prev') {
        environment = 'preview';
      } else if (argv.environment === 'development' || argv.environment === 'dev') {
        environment = 'development';
      }

      // Read base-environment data:
      var envData;
      var fs = require('fs');

      var rawdata = fs.readFileSync('./src/environments/environment.default.json');
      envData = JSON.parse(rawdata);

      if (!envData || typeof envData !== 'object') {
        throw 'No base environment found';
      }

      if (environment === 'production') {
        envData.production = true;
      }

      var values = getDotenvValues(environment);
      for (var key in values) {
        if (values[key] === undefined || typeof values[key] === 'function') { continue; }
        if (envData[key] === undefined) { continue; }
        envData[key] = values[key];
      }

      var output = "/* eslint-disable @typescript-eslint/quotes */\n";
      output += "/* eslint-disable quote-props */\n\n";
      output += "import { EnvironmentModel } from './environment.model';\n\n";
      output += "export const environment: EnvironmentModel = " + JSON.stringify(envData, null, 2) + ";\n";

      fs.writeFile('./src/environments/environment.temp.ts', output, function (err) {
        if (err) {
          throw err;
        }

        console.log("ENVIRONMENT SUCCESSFULLY BUILT [environment.temp.ts]");
        resolve(true);

      });
    } catch (e) {
      console.error('Environment Builder Failed with: ', e);
      reject();
    }
  });
};

var getDotenvValues = function (environment) {
  var output = {};
  try {
    require('dotenv').config({ path: '.vercel/.env.' + environment + '.local' });
    for (var key in process.env) {
      if (process.env[key] === undefined || typeof process.env[key] === 'function') { continue; }
      output[key] = process.env[key];
    }
  } catch (e) { }
  return output;
};

var downloadSitemap = function (url) {
  return new Promise(function (resolve) {
    try {
      // Download current sitemap:
      var download = require('download');
      download(url, 'src').then(function () {
        resolve(true);
      }).catch(function () {
        resolve(false);
      });
    } catch (e) { resolve(false); }
  });
};
