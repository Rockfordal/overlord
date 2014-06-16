
module.exports = {

  schema: true,

  attributes: {
    namn: 'STRING',
    datum: 'STRING',
    tid: 'STRING',
    info: 'STRING',
    org_id: 'STRING'
  },

  toJSON: function(){
    var obj = this.toObject();
    delete obj._csrf;
    return obj;
  }
};