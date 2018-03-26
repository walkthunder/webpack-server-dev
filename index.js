let path = require('path');
let isEmpty = require('lodash').isEmpty;
let spawn = require('child_process').spawn;

function onStdOut(data) {
  server.stdout.on('data', x => process.stdout.write(x));
}

/**
 * Get default file name of entry configuration of compiler
 * Note that if there are multiple entries, and no fileName is assigned,
 * this function would return the fileName of the first entry
 * @param {*} compiler - Webpack compiler
 * @param {String|*} fileName
 * @return {String|undefined}
 */
function getEntryName(compiler, fileName) {
  if (compiler && compiler.options && compiler.options.entry) {
    var entry = compiler.options.entry;
    for (let key in entry) {
      if (entry.hasOwnProperty(key)) {
        if (fileName) {
          if (fileName === key) {
            return fileName
          }
        } else {
          return key;
        }
      }
    }
    return undefined;
  }
}

module.exports = class ServerDevPlugin {
  constructor() {
    this.chunkVersions = {};
    this.server;
    this.serverPath;
  }

  restartServer() {
    if (this.server) {
      this.server.kill('SIGTERM');
    }
    if (!this.serverPath) {
      return new Error('Cannot find valid bundle file');
    }
    this.server = spawn('node', [this.serverPath]);
    this.server.stdout.on('data', x => process.stdout.write(x));
    this.server.stderr.on('data', x => process.stderr.write(x));
    process.on('exit', () => {
      if (this.server) {
        this.server.kill('SIGTERM');
      }
    })
  }

  apply(compiler) {
    var self = this;
    var output = compiler.options.output;
    this.serverPath = path.join(output.path, output.filename).replace(/\[name\]/i, getEntryName(compiler));
    compiler.plugin('emit', function(compilation, callback) {
      var changedChunks = compilation.chunks.filter(function(chunk) {
        var oldVersion = self.chunkVersions[chunk.name];
        self.chunkVersions[chunk.name] = chunk.hash;
        return chunk.hash !== oldVersion;
      }.bind(self));

      if (!isEmpty(changedChunks)) {
        self.restartServer();
      }

      callback()
    });
  }
}