# Ti-Loki



## Overview

[LokiJS](https://github.com/techfort/LokiJS) is a document oriented database written in javascript, published under MIT License. Its purpose is to store javascript objects as documents in a nosql fashion and retrieve them with a similar mechanism.

[LokiJS](https://github.com/techfort/LokiJS) supports indexing and views and achieves high-performance through maintaining unique and binary indexes (indices) for data.

### Main Features

1. Fast performance NoSQL in-memory database, collections with unique index (1.1M ops/s) and binary-index (500k ops/s)
2. Runs in multiple environments (browser, node, titanium)
3. Dynamic Views for fast access of data subsets
4. Built-in persistence adapters, and the ability to support user-defined ones
5. Changes API
6. Joins


## Installation

Using __NPM__:
```bash
npm install ti-loki --save
```

Using __gitTio__:
```bash
gittio install ti-loki
```

Or download the latest [zip file](https://github.com/ianko/ti-loki/tree/master/dist) and place it in the root of your project. Add the module in the `tiapp.xml`:

```xml
<module platform="commonjs">ti-loki</module>
```


## Usage
Creating a database :

```javascript
var db = new Loki('example.db');
```

Add a collection :

```javascript
var users = db.addCollection('users');
```

Insert documents :

```javascript
users.insert({
	name: 'Odin',
	age: 50,
	address: 'Asgard'
});

// alternatively, insert array of documents
users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);
```

Simple find query :

```javascript
var results = users.find({ age: {'$gte': 35} });

var odin = users.findOne({ name:'Odin' });
```

Simple where query :

```javascript
var results = users.where(function(obj) {
	return (obj.age >= 35);
});
```

Simple Chaining :

```javascript
var results = users.chain().find({ age: {'$gte': 35} }).simplesort('name').data();
```

Simple named transform :

```javascript
users.addTransform('progeny', [
  {
    type: 'find',
    value: {
      'age': {'$lte': 40}
    }
  }
]);

var results = users.chain('progeny').data();
```

Simple Dynamic View:

```javascript
var pview = users.addDynamicView('progeny');

pview.applyFind({
	'age': {'$lte': 40}
});

pview.applySimpleSort('name');

var results = pview.data();
```

To complete documentation, please visit [Loki](http://lokijs.org) and [documentation](http://lokijs.org/#/docs).

