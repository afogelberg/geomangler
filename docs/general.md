# General
Miscellaneous functions.

---

<a id="add">#</a> **add**(format, name, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/add.js)<br>
Reads a source and makes a feature collection of it. Features are returned and the current feature collection is updated.  

**Parameters**<br>
`format`<br>
Format to read<br>
`name`<br>
File name including path<br>
`options` *optional object*<br>
format specific options

---

<a id="save">#</a> **save**(format, name, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/save.js)<br>
Writes a source.

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
