
/*------------------+
| LOKI              |
-------------------*/

var Loki                = require('lokijs')
var LokiTitaniumAdapter = require('./loki-titanium-adapter')

function TiLoki(dbname, options) {
  options = options || {};

  if (!options.adapter) {
    options.adapter = new LokiTitaniumAdapter();
  }

  return new Loki(dbname, options);
};

module.exports = TiLoki;
