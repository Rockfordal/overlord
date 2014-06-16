
module.exports = {

  schema: true,

  attributes: {
    namn: 'STRING',
    orgnr: 'STRING',
    branschkod: 'INTEGER',
    branschtext: 'STRING',
    anstellda: 'STRING',
    omsintervall: 'STRING',
    utdadr: 'STRING',
    postnr: 'STRING',
    postort: 'STRING',
    besadr: 'STRING',
    bespostnr: 'STRING',
    bespostort: 'STRING',
    telefon: 'STRING',
    info: 'STRING',
    contacts: {
      collection: "Contact", via: "contacts"
    }

  },

  toJSON: function(){
    var obj = this.toObject();
    delete obj._csrf;
    return obj;
  }
};