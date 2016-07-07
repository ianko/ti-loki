
/*------------------+
| ADAPTER           |
-------------------*/

/**
 * A loki persistence adapter which persists using node fs module
 * @constructor LokiTitaniumAdapter
 */
function LokiTitaniumAdapter() {
  this.databases = {};
};

/**
 * _getFile() - Get the file reference, or create a new one
 * @param {string} dbname - the filename of the database to load
 * @memberof LokiTitaniumAdapter
 */
LokiTitaniumAdapter.prototype._getFile = function _getFile(dbname) {
    if (this.databases[dbname]) {
      return this.databases[dbname];
    }

    this.databases[dbname] = Ti.Filesystem.getFile(
      Ti.Filesystem.applicationDataDirectory, dbname);

    return this.databases[dbname];

  };

/**
 * loadDatabase() - Load data from file, will throw an error if the file does not exist
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof LokiTitaniumAdapter
 */
LokiTitaniumAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
    var file = this._getFile(dbname);

    if (!file.exists()) {
      return callback(new Error('File not exists'));
    }

    callback(file.read().toString());

  };

/**
 * saveDatabase() - save data to file, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof LokiTitaniumAdapter
 */
LokiTitaniumAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
    var file = this._getFile(dbname);

    callback(file.write(dbstring));
  };

/**
 * deleteDatabase() - delete the database file, will throw an error if the
 * file can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof LokiTitaniumAdapter
 */
LokiTitaniumAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
    var file = this._getFile(dbname);

    if (!file.exists()) {
      return callback(new Error('File not exists'));
    }

    callback(file.deleteFile());

  };

module.exports = LokiTitaniumAdapter;
