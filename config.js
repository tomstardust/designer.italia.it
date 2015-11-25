var config = {
  "git": {
    "repository": process.env['LG_REPOSITORY'] || "https://github.com/italia-it/designer.italia.it"
  },
  "templates": {
    "dir": "template"
  },
  "site": {
    "downloads": {
      "agid-bootstrap": "assets/agid-bootstrap.zip"
    },
    "brand": process.env['LG_BRAND'] || "design.italia.it",
    "name": "Linee guida di design per i siti web della PA",
    "description": "Progettare il design dei siti web della Pubblica Amministrazione (versione alfa)",
    "gaUser": process.env['LG_GAUSER'] || "UA-3351165-20",
    "htmlDir": "linee-guida",
    "baseurl": process.env['LG_BASEURL'] || "/",
    "version": "Versione alfa"
  }
};

try {
  var overrides = require('./config.local');
  config = Object.assign({}, config, overrides);
} catch (e) {
}

module.exports = config;