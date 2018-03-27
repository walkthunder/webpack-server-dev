Webpack server development plugin
==============================
> Easily develop nodejs server app

When developing nodejs backend server, server-dev-webpack-plugin can help you to auto restart the server when code changes are detected.
It's just like webpack-dev-server, but for the nodejs backend server development.

## Quick usage

```sh
npm install server-dev-webpack-plugin --save-dev
```

In your `webpack.config.js`:

```js
var ServerDevPlugin = require('server-dev-webpack-plugin');

...

watch: true,
plugins: [
  new ServerDevPlugin()
]
```
And that's it. This webpack plugin would be work with `watch` option.

When you run `npm run dev`, your code would be watched and your server would run automatically.

## Detailed overview

### Description
 This plugin actually auto starts the webpack output entry as a server. And keep listening to the `emit` event of  `compiler`. If the output chunks change is detected, the plugin would restart the server.

### Configuration
This plugin accepts an `options` object.

#### `options.starter`
If there are more than one entries, `options.starter` would determine which entry file would be used to start the server.
If it's empty, `server-dev-webpack-plugin` would run the first entry as default.


## Contribute
Contributions and pull requests are welcome. Please run the tests to make sure nothing breaks.

## License
MIT