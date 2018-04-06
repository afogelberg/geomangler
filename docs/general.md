# General
Miscellaneous functions.

---

<a id="add">#</a> **add**(format, name, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/add.js)<br>
Reads a source and makes a feature collection of it. Features are returned and the current feature collection is updated. Supported formats are csv, GeoJSON, TopoJSON and gml.

**Parameters**<br>
`format`<br>
Format to read<br>
`name`<br>
File name including path<br>
`options` *optional object*<br>
format specific options

---

<a id="db">#</a> **db**(dbType, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/utils/dbconnect.js)<br>
Creates and returns a [knex](http://knexjs.org) db connection. This connection can be used to make and read queries for the currently supported db formats.

**Parameters**<br>
`dbType`<br>
Database type.<br>
`options` *connection object*<br>
the connection settings.

---

<a id="read">#</a> **read**(format, features, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/read.js)<br>
Read features in given format. Supported formats are csv, GeoJSON, TopoJSON, gml and json. Features are returned and the current feature collection is updated.

**Parameters**<br>
`format`<br>
Format to read<br>
`features`<br>
Features in given format to read<br>
`options` *optional object*<br>

---
<a id="save">#</a> **save**(format, name, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/save.js)<br>
Saves a source. Supported formats are csv, GeoJSON, TopoJSON and gml.

**Parameters**<br>
`format`<br>
Format to write<br>
`name`<br>
File name<br>
`options` *optional object*<br>
format specific options

---

<a id="server">#</a> **server**(options) [<>](https://github.com/afogelberg/geomangler/blob/master/server/server.js)<br>
Starts the built in express server.

**Parameters**<br>
`options` *optional object*<br>
port | server port to use. Default is 3000.

---

<a id="write">#</a> **write**(format, features, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/write.js)<br>
Write features in given format. Supported formats are csv, GeoJSON, TopoJSON, gml and json.

**Parameters**<br>
`format`<br>
Format to write<br>
`features`<br>
Features to write<br>
`options` *optional object*<br>
port | server port to use. Default is 3000.

---
