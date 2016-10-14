/* @flow */
// www.andrewsouthpaw.com/2015/02/08/environment-variables/
import nconf from 'nconf';

// Use less-terrible separator character, stackoverflow.com/questions/25017495
nconf.env('__');

// For local development, we can override defaults easily. Rename
// src/common/_config.json to src/common/config.json and uncomment next line.
// nconf.file('src/common/config.json');

// Remember, never put secrets in the source code. Use environment variables for
// production or src/common/config.json for development instead.
nconf.defaults({
  appName: require('../../package.json').name,
  // Use appVersion defined in gulp env task or Heroku dyno metadata.
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  defaultLocale: 'en',
  firebase: {
    // To get the config, just click Add web app from the overview page.
    apiKey: 'AIzaSyC2FR1Sd8Of2ecmDJYzAO7n-DdZrNgb5ps',
    authDomain: 'hibbo-86853.firebaseapp.com',
    databaseURL: 'https://hibbo-86853.firebaseio.com',
    storageBucket: 'project-808488257248094054.appspot.com',
  },
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['en', 'fr'],
  port: process.env.PORT || 3000,
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: false,
  sentryUrl: 'https://c994fabb4439485f9e3d49de18a2d459@sentry.io/106204',
});

export default nconf.get();
