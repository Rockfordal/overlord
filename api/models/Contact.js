
module.exports = {

  schema: true,

  attributes: {
    namn: 'STRING',
    titel: 'STRING',
    info: 'STRING',
    orgunit: {
      model: "orgunit"
    }
  },

  toJSON: function(){
    var obj = this.toObject();
    delete obj._csrf;
    return obj;
  }
};