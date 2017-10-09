# Geomangler
Geomangler is a utility library to process and transform geodata in Node.js. This is a small weight and fast alternative to for example FME.

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
var gm = require('geomangler');

gm.add('geojson', 'in file name');
gm.buffer(5);
gm.save('geojson', 'out file name', {
  path: './',
  epsgCode: 'EPSG:3010'
});

```

# Api reference

### [General](https://github.com/afogelberg/geomangler/blob/master/docs/general.md)

* [add](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#add) - add source from file.
* [save](https://github.com/afogelberg/geomangler/blob/master/docs/general.md#save) - save source to file.

### [Manglers](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md)

* [buffer](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#buffer) - buffer points.
* [changeCase](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#changecase) - changes case.
* [changeGeometryType](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#changegeometrytype) - change geometry type.
* [deleteFields](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#deletefields) - deletes fields.
* [filterByText](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#filterbytext) - filter features by text.
* [joinFeatures](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#joinfeatures) - join features by common field
* [merge](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#merge) - merge feature collections
* [renameFields](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#renameFields) - rename fields
* [replaceText](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#replacetext) - search and replace text
* [transform](https://github.com/afogelberg/geomangler/blob/master/docs/manglers.md#transform) - set new projection

### [Helpers](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md)

* [getFieldNames](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md#getfieldnames) - get field names.
* [getUniqueValues](https://github.com/afogelberg/geomangler/blob/master/docs/helpers.md#getuniquevalues) - get unique values from field.
