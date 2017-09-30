/**
 * Modul för att dela upp objekt efter typ.
 * Först kollas geometrityp. Om geometrityp saknas hoppas objektet över.
 * Annars skrivs geometryType till aktuellt objekt.
 * Returnerar ett objekt med en prop per typ, dvs lager
 * Varje typ blir en array
'*/

module.exports = function(objects) {
  var res = [];
  objects.forEach(function(obj) {
    var validated = validator(obj);
    if (validated) {
      res.push(validated);
    }
  });
  return res;
}

function validator(obj_in) {
  var obj = {};

  // Rename Typ names
  var type = validateStr(obj_in.Typ, templates.Typ);
  if (type === 'Kartartikel') {
    obj_in.Typ = obj_in.Kartkategori.toLowerCase();
  } else {
    obj_in.Typ = type;
  }

  // Apply correct template
  if (type === 'socken') {
    obj = validateObj(obj_in, templates.Socken);
    obj.Url_artikel = cleanHtml('href', obj.Url_artikel);
  } else {
    obj = validateObj(obj_in, templates.Kartartikel);
    obj.Url_extern = cleanHtml('href', obj.Url_extern);
    obj.Beskrivning = cleanHtml('p', obj.Beskrivning);
  }

  if (obj.geometry) {
    return obj;
  } else {
    return undefined;
  }
}

function validateObj(obj_in, template) {
  var obj = {};
  var props = Object.getOwnPropertyNames(obj_in);
  props.forEach(function(prop) {
    if (template.hasOwnProperty(prop)) {
      obj[template[prop]] = obj_in[prop];
      // obj[template[prop]] = obj_in[prop].replace(/"/gi, '\"');
    }
  });
  return obj;
}

function cleanHtml(htmlType, val) {
  if (htmlType === 'href') {
    var match = val.match(/href="([^"]*)/);
    if (match) {
      return match[1];
    } else {
      return val;
    }
  } else {
    var match = val.match(/<p>([^</p>]*)/);
    if (match) {
      return match[1];
    } else {
      return val;
    }
  }
}

function validateStr(str_in, template) {
  var str;
  var props = Object.getOwnPropertyNames(template);
  props.forEach(function(prop) {
    if (template.hasOwnProperty(str_in)) {
      str = template[str_in];
    }
  });
  return str;
}

var templates = {
  Typ: {
    'Rita socknen': 'socken',
    'Evenemang': 'evenemang',
    'Dela med mig': 'dela',
    'Artikel karta': 'Kartartikel'
  },
  Kartartikel: {
    'Titel': 'Titel',
    'Beskrivning': 'Beskrivning',
    'Bild': 'Bild',
    'Typ': 'Typ',
    'URL-extern-sida': 'Url_extern',
    'URL': 'Url',
    'Koordinater': 'geometry'
  },
  Socken: {
    'Titel': 'Titel',
    'Beskrivning': 'Beskrivning',
    'Typ': 'Typ',
    'URL': 'Url',
    'Sockenartikel': 'Url_artikel',
    'Polygonkoordinater': 'geometry'
  }
};
