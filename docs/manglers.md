# Manglers
Manglers always return a collection of features and reset the current feature collection.

---

<a id="buffer">#</a> **buffer**(radius, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/buffer.js)<br>
Returns buffered features of points. Buffer can be either circle or square.  

**Parameters**<br>
`radius`<br>
Radius in meters<br>
`options` *optional object*<br>
type | Type of buffer. Can be circle or square.<br>
features | Optional features to use.

---

<a id="changecase">#</a> **changeCase**(type, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/changecase.js)<br>
Returns features with changed case of chosen fields.  

**Parameters**<br>
`type`<br>
The type of case to change to. Can be title, upper, lower or upperLast. Title will change the first letter to upper case of each word. <br>
`options` *optional object*<br>
features | Optional features to use.<br>
delimiter | Delimiter to use to separate words. Default is space.<br>
fields | Array of fields to change case. Default is all fields. <br>

---

<a id="changegeometrytype">#</a> **changeGeometryType**(source, destination, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/changegeometrytype.js)<br>
Returns features with changed geometry type.

**Parameters**<br>
`source`<br>
The current geometry type. Currently multipolygon is available.<br>
`destination`<br>
The destination geometry type to change to. Currently Multipolygon to Polygon, Multiline to Line and Multipoint to Point are available.<br>
`options` *optional object*<br>
features | Optional features to use.<br>

---

<a id="deletefields">#</a> **deleteFields**(fields, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/deletefields.js)<br>
Returns features with deleted fields.  

**Parameters**<br>
`fields`<br>
Array of fields to delete<br>
`options` *optional object*<br>
features | Optional features to use.<br>

---

<a id="filterbytext">#</a> **filterByText**(find, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/filterbytext.js)<br>
Returns filtered features matching the find critera.

**Parameters**<br>
`find`<br>
The string to search for. Feature will be returned if a field contains the string<br>
`options` *optional object*<br>
features | Optional features to use.<br>
fields | Fields to search in. Deafult is all.<br>
caseSensitive | Default is true.<br>
exclude | Negative search. Feature will be returned if no match. Default is false.<br>

---

<a id="joinfeatures">#</a> **joinFeatures**(source, field, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/joinfeatures.js)<br>
Returns joined features.

**Parameters**<br>
`source`<br>
Source of features to join the target source. Default target source is current features.<br>
`field`<br>
Field of the source to use for the join<br>
`options` *optional object*<br>
features | Optional features to use.<br>
targetField | Target field to use for join. Default is source field.<br>
keepAll | If only matchning features of the target should be returned. Deafult is true.<br>

---

<a id="merge">#</a> **merge**(featureCollections, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/merge.js)<br>
Merge feature collections. Returns merged collections.

**Parameters**<br>
`featureCollections`<br>
Array of featureCollections. Current feature collection is included by default.<br>
`options` *optional object*<br>

---

<a id="move">#</a> **move**(deltaX, deltaY, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/move.js)<br>
Move features based on given delta x and y values. Returns moved features.

**Parameters**<br>
`deltaX`<br>
Delta X to move.<br>
`deltaY`<br>
Delta Y to move.<br>
`options` *optional object*<br>

---

<a id="renamefields">#</a> **renameFields**(obj, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/renamefields.js)<br>
Returns features with renamed fields.

**Parameters**<br>
`obj`<br>
Object of new and old field names<br>
`options` *optional object*<br>
features | Optional features to use.<br>

**Example**<br>
```
gm.renameFields({
  'newField': 'oldField'
});
```
---

<a id="replacetext">#</a> **replaceText**(find, replace, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/replacetext.js)<br>
Returns features with replaced text of chosen fields.  

**Parameters**<br>
`find`<br>
Text string to search for<br>
`replace`<br>
Text string to replace with<br>
`options` *optional object*<br>
features | Optional features to use.<br>
fields | Array of fields to replace text. Default is all fields. <br>

---

<a id="transform">#</a> **transform**(source, destination, options) [<>](https://github.com/afogelberg/geomangler/blob/master/lib/manglers/transform.js)<br>
Returns transformed features. Projection must be defined in conf/projections. Projection definitions can by find at http://epsg.io/

**Parameters**<br>
`source`<br>
Source projection as EPSG code<br>
`destination`<br>
Target projection as EPSG code<br>
`options` *optional object*<br>
features | Optional features to use.<br>

---
