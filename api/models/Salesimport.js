module.exports = {

  schema: true,

  attributes: {
    branschkod: 'INTEGER',
    orgnr: 'STRING',
    orgnamn: 'STRING',
    namn: 'STRING',
    orgnamn: 'STRING',
    utdadr: 'STRING',
    postnr: 'STRING',
    postort: 'STRING',
    besadr: 'STRING',
    bespostnr: 'STRING',
    bespostort: 'STRING',
    telefon: 'STRING',
    titel: 'STRING',
    namn: 'STRING',
    branschkod: 'STRING',
    branschtext: 'STRING',
    anstellda: 'STRING',
    omsintervall: 'STRING'
  },

    toJSON: function(){
      var obj = this.toObject();
      delete obj._csrf;
      return obj;

  }
};