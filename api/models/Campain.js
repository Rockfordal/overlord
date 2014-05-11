
module.exports = {

  schema: true,

  attributes: {
    namn: 'STRING',
    info: 'STRING'
  },

  toJSON: function(){
    var obj = this.toObject();
    delete obj._csrf;
    return obj;
  }
};