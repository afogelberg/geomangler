# Geomangler
Geomangler is a utility library to process and transform geodata in Node.js. It can also be used as a geospatial server with the built in express server. Currently supported formats are csv, GeoJSON, TopoJSON, gml and json.

# Installing
Git and Node.js (6 or higher) is required.

```
npm install geomangler
```

or

1. Clone the repository: `git clone https://github.com/afogelberg/geomangler.git`
2. Install with npm: `npm install`

# Getting started
It's easy to get started. Just require geomangler and start to mangle your geodata, as in this example.
```
const gm = require('geomangler');

gm.add('geojson', 'in file name');
gm.buffer(5);
gm.save('geojson', 'out file name', {
  path: './',
  epsgCode: 'EPSG:3010'
});

```

# Using Geomangler as a server
Geomangler can also be used as a server, for example like this.
```
const gm = require('geomangler');
const gmscript = require('./scripts/gmscript');

const server = gm.server({
  port: '3011'
});

server.post('/geomangler', gmscript);
```

# Api reference

### [General](https://github.com/afogelberg/geomangler/blob/master/docs/general.md)

* [add](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#add) - add source from file.
* [db](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#db) - create a db connection.
* [read](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#read) - read features from a format.
* [save](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#save) - save source to file.
* [server](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#server) - start/use an express server.
* [write](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#write) - write features in a format.

### [Manglers](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md)

* [buffer](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#buffer) - buffer points.
* [center](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#center) - get center of geometry.
* [changeCase](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#changecase) - changes case.
* [changeGeometryType](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#changegeometrytype) - change geometry type.
* [deleteFields](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#deletefields) - deletes fields.
* [filterByText](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#filterbytext) - filter features by text.
* [flipCoordinates](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#flipcoordinates) - flip the axis ordering.
* [joinFeatures](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#joinfeatures) - join features by common field
* [merge](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#merge) - merge feature collections
* [move](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#move) - move features
* [renameFields](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#renamefields) - rename fields
* [replaceText](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#replacetext) - search and replace text
* [transform](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#transform) - set new projection

### [Helpers](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md)

* [getFieldNames](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md#getfieldnames) - get field names.
* [getUniqueValues](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md#getuniquevalues) - get unique values from field.
