module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;
 
    return this.addBowerPackageToProject('select2');
  }
};
