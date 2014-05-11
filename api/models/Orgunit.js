
module.exports = {

  schema: true,

  attributes: {
    namn: 'STRING',
    orgnr: 'STRING',
    contacts: {
      collection: "contact",
      via: "contact"
    }

  },

  toJSON: function(){
    var obj = this.toObject();
    delete obj._csrf;
    return obj;
  }
};